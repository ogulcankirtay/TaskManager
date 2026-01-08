using Business.Services;
using Business.Services.Interfaces;
using Business.Validators;
using FluentValidation;
using FluentValidation.AspNetCore;

namespace Business
{
    public static class BusinessServiceRegistration
    {
        public static IServiceCollection AddBusinessServices(this IServiceCollection services)
        {
            services.AddScoped<ITaskService, TaskService>();

            services.AddFluentValidationAutoValidation();
            services.AddFluentValidationClientsideAdapters();
            services.AddValidatorsFromAssemblyContaining<TaskCreateDtoValidator>();

            return services;
        }
    }
}
