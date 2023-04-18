using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace CVEasy_API.Helpers;

public class JwtMiddleware
{
    private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var authorization = context.Request.Headers["Authorization"].FirstOrDefault();

            //if (context.Request.Method == "GET" && authorization == null)
            //{
            //    context.Request.Headers["Authorization"] = "Bearer " + context.Request.Query["token"].ToString();
            //}

            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (!string.IsNullOrEmpty(token))
                await AttachAccountToContext(context, token);

            await _next(context);
        }

        private Task AttachAccountToContext(HttpContext context, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("YjjYgwP4JxbAbFHBCpPp");

                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    RequireExpirationTime = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.FromDays(0)
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "UserID").Value);

                AccountLogin accountLogin = new AccountLogin
                {
                    Id = userId,
                    Token = token
                };

                // attach account to context on successful jwt validation
                context.Items["UserLogin"] = accountLogin;
            }
            catch (Exception ex)
            {
                // do nothing if jwt validation fails
                // account is not attached to context so request won't have access to secure routes
                // throw new AppException(ex.Message);
                context.Items["UserLogin"] = null;
            }

            return Task.CompletedTask;
        }
}