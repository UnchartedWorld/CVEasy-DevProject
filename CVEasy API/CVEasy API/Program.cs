using System.Text;
using CVEasy_API.Data;
using CVEasy_API.Helpers;
using CVEasy_API.Interfaces;
using Microsoft.EntityFrameworkCore;
using CVEasy_API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add HTTP context for relevant services
builder.Services.AddHttpContextAccessor();

// Add services to the container.
builder.Services.AddScoped<IUser, UserService>();
builder.Services.AddScoped<IComments, CommentsService>();
builder.Services.AddScoped<IThemes, ThemeService>();
builder.Services.AddScoped<ITags, TagsService>();
builder.Services.AddScoped<IAuthentication, AuthenticationService>();
builder.Services.AddControllers();

// Registers the DB Context to the Program.cs
var connectionString = builder.Configuration["ConnectionStrings:CVEasyDB"];
builder.Services.AddDbContext<DataContext>(options =>
    options.UseNpgsql(connectionString));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Adds authentication service
var key = Encoding.ASCII.GetBytes("YjjYgwP4JxbAbFHBCpPp");
{
    builder.Services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(x =>
        {
            x.RequireHttpsMetadata = false;
            x.SaveToken = true;
            x.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                ClockSkew = TimeSpan.Zero
            };
        });
}

// Adds authorization with Swagger. Uses https://code-maze.com/swagger-authorization-aspnet-core/
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "CVEasy API", Version = "v1" } );
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Enter JWT Token. You got this from using the Login API Endpoint (if not, go do so)",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CVEasy API v1"));

    // Custom JWT authentication middleware
    app.UseMiddleware<JwtMiddleware>();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();