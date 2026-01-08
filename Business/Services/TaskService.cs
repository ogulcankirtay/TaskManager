
using Business.Services.Interfaces;
using Data.Data;
using Domain.Dto;
using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Business.Services;

public class TaskService : ITaskService
{
    private readonly AppDbContext _context;

    private readonly ILogger<TaskService> _logger;
    private readonly ILogger<TaskService>? logger;

    public TaskService(AppDbContext context, ILogger<TaskService>? logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<PagedResult<TaskDto>> GetAllAsync(int page, int pageSize)
    {
        _logger.LogInformation("GetAllAsync çağrıldı, page={Page}, pageSize={PageSize}", page, pageSize);

        try
        {
            var query = _context.Tasks
                .Where(x => !x.IsDeleted)
                .OrderByDescending(x => x.CreatedAt);

            var totalCount = await query.CountAsync();

            var tasks = await query
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

            return new PagedResult<TaskDto>
            {
                Items = tasks,
                TotalCount = totalCount
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "GetAllAsync sırasında hata oluştu");
            throw;
        }
    }


    public async Task CreateAsync(TaskCreateDto dto)
    {
        _logger.LogInformation("Yeni görev ekleniyor: {Title}", dto.Title);

        try
        {
            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description
            };

            await _context.Tasks.AddAsync(task);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Görev eklendi, Id={Id}", task.Id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "AddAsync sırasında hata oluştu");
            throw;
        }
    }

    public async Task UpdateStatusAsync(int id, TaskStatusUpdateDto dto)
    {
        _logger.LogInformation("Task status güncelleniyor: Id={Id}, NewStatus={Status}", id, dto.Status);

        try
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

            if (task == null)
                throw new Exception("Task not found");

            task.Status = (Status)dto.Status;
            await _context.SaveChangesAsync();
            _logger.LogInformation("Task status güncellendi: Id={Id}, {OldStatus} → {NewStatus}", id, task.Status, dto.Status);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "UpdateStatusAsync sırasında hata oluştu");
            throw;
        }
    }
}
