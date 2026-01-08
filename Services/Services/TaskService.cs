using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Data;
using TaskManager.Api.Dto;
using TaskManager.Api.Entities;
using Business.Services.Interfaces;

namespace Business.Services;

public class TaskService : ITaskService
{
    private readonly AppDbContext _context;

    public TaskService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<TaskDto>> GetAllAsync(int page, int pageSize)
    {
        return await _context.Tasks
            .Where(x => !x.IsDeleted)
            .OrderByDescending(x => x.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new TaskDto
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                Status = (TaskStatus)x.Status,
                CreatedAt = x.CreatedAt
            })
            .ToListAsync();
    }

    public async Task CreateAsync(TaskCreateDto dto)
    {
        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description
        };

        await _context.Tasks.AddAsync(task);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateStatusAsync(int id, TaskStatusUpdateDto dto)
    {
        var task = await _context.Tasks.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (task == null)
            throw new Exception("Task not found");

        task.Status = (TaskManager.Api.Enums.Status)dto.Status;
        await _context.SaveChangesAsync();
    }
}
