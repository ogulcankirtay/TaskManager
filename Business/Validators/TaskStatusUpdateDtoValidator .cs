using Domain.Dto;
using FluentValidation;

namespace TaskManager.Api.Validators
{
    public class TaskStatusUpdateDtoValidator : AbstractValidator<TaskStatusUpdateDto>
    {
        public TaskStatusUpdateDtoValidator()
        {
            RuleFor(x => x.Status)
                .IsInEnum().WithMessage("Geçersiz durum değeri");
        }
    }
}
