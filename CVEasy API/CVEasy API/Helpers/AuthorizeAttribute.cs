using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CVEasy_API.Helpers;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AuthorizeAttribute : Attribute, IAuthorizationFilter
{

    public AuthorizeAttribute()
    {
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var account = (AccountLogin)context.HttpContext.Items["UserLogin"];

        if (account == null)
        {
            // not logged in or role not authorized
            context.Result = new JsonResult(new { code = 401, message = "Unauthorized" }) { StatusCode = StatusCodes.Status200OK };
        }
        else
        {   
            var token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != account.Token)
            {
                context.Result = new JsonResult(new { code = 419, message = "Account expired" }) { StatusCode = StatusCodes.Status200OK };
            }
        }
    }
}