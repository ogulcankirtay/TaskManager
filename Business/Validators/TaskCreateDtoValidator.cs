using Domain.Dto;
using FluentValidation;

namespace Business.Validators
{
    public class TaskCreateDtoValidator : AbstractValidator<TaskCreateDto>
    {
        public TaskCreateDtoValidator(){
            RuleFor(x => x.Title)
           .NotEmpty().WithMessage("Başlık boş olamaz")
           .MinimumLength(3).WithMessage("Başlık en az 3 karakter olmalı");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Açıklama boş olamaz");
        }   
    }
}
