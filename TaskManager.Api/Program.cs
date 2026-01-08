using Business;
using Data.DI;
using TaskManager.Api.Middlewares;


public partial class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

       
        builder.Services.AddDataServices(builder.Configuration);
        builder.Services.AddBusinessServices();

        builder.Logging.ClearProviders();      
        builder.Logging.AddConsole();         
        builder.Logging.AddDebug();

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend",
                policy =>
                {
                    policy
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
        });


        var app = builder.Build();

        app.UseMiddleware<ExceptionMiddleware>();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.ApplyMigrations();
        app.UseCors("AllowFrontend");

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}