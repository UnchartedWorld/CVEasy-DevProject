using CVEasy_API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using CVEasy_API.Model;

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

            return Ok(
                $"Login request was successful. For bug-checking reasons, we'll display the email now. {user.Email}");
        }

        [HttpPost("Register")]
        public IActionResult Register([FromForm] UserRegistrationRequest registrationRequest)
        {
            _authentication.RegisterUser(registrationRequest);


            return Ok($"Test message");
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