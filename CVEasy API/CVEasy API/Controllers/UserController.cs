using CVEasy_API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using CVEasy_API.DTOs;

namespace CVEasy_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUser _user; // Initiates a new data context each time it's called. 
        private IAuthentication _authentication;

        public UserController(IUser user, IAuthentication authentication)
        {
            _user = user;
            _authentication = authentication;
        }

        // POST: api/User
        [HttpPost("Login")]
        public IActionResult Login([FromForm] UserLoginRequest loginRequest)
        {
            var user = _user.GetUser(loginRequest);
            if (user == null)
            {
                return BadRequest("Email or password is wrong.");
            }

            var stringToken = _authentication.GenerateJwtToken(user);

            return Ok(new
            {
                code = 200, userID = user.UserId, token = stringToken
            });
        }

        [Helpers.Authorize]
        [HttpPost("PostUserDetails")]
        public IActionResult UpdateUserDetails([FromForm] UserDetailsRequest detailsRequest)
        {
            try
            {
                _user.UploadUserDetails(detailsRequest);
                return Ok(new { code = 201, message = "Details successfully submitted." });
            }
            catch (Exception e)
            {
                return BadRequest(new
                    { code = 400, message = "Either the detail entry already exists or the input was wrong." });
            }
        }

        [HttpPost("Register")]
        public IActionResult Register([FromForm] UserRegistrationRequest registrationRequest)
        {
            try
            {
                _authentication.RegisterUser(registrationRequest);

                return Ok(new
                    { code = 201, message = $"User successfully registered. Welcome {registrationRequest.Username}!" });
            }
            catch (Exception e)
            {
                return BadRequest(new
                {
                    code = 400,
                    message = "Registration failed. Either you didn't input something, or did something wrong."
                });
            }
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}