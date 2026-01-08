using Domain.Dto;

namespace Business.Services.Interfaces;

public interface ITaskService
{
    Task<PagedResult<TaskDto>> GetAllAsync(int page, int pageSize);
    Task CreateAsync(TaskCreateDto dto);
    Task UpdateStatusAsync(int id, TaskStatusUpdateDto dto);
}