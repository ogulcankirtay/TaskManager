using TaskManager.Api.Dto;

namespace Business.Services.Interfaces;

public interface ITaskService
{
    Task<List<TaskDto>> GetAllAsync(int page, int pageSize);
    Task CreateAsync(TaskCreateDto dto);
    Task UpdateStatusAsync(int id, TaskStatusUpdateDto dto);
}