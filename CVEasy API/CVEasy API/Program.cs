using CVEasy_API.Controllers;
using CVEasy_API.Data;
using CVEasy_API.Interfaces;
using Microsoft.EntityFrameworkCore;
using CVEasy_API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IUser, UserService>();
builder.Services.AddScoped<IUserCategory, UserCategoryService>();
builder.Services.AddScoped<IComments, CommentsService>();
builder.Services.AddScoped<IThemes, ThemesService>();
builder.Services.AddScoped<ITags, TagsService>();
builder.Services.AddControllers();

// Registers the DB Context to the Program.cs
var connectionString = builder.Configuration["ConnectionStrings:CVEasyDB"];
builder.Services.AddDbContext<DataContext>(options =>
    options.UseNpgsql(connectionString));


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CVEasy API v1"));
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();