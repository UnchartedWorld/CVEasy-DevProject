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

        [HttpGet("UserInfo/{userId:int}", Name = "GetUserInfo")]
        public OkObjectResult GetUserInfo(int userId)
        {
            try
            {
                var userInfo = _user.GetUserInfo(userId);
                return Ok(new { code = 200, message = "User info found.", data = userInfo });
            }
            catch (Exception e)
            {
                return new OkObjectResult(NotFound(new
                    { code = 404, message = "User not found, thus no details :(" }));
            }
        }

        // Used for retrieving user details, different to info.
        [HttpGet("UserDetails/{userIdForUserDetails:int}", Name = "GetUserDetails")]
        public OkObjectResult GetUserDetails(int userIdForUserDetails)
        {
            try
            {
                var userDetails = _user.GetUserDetails(userIdForUserDetails);
                return Ok(new { code = 200, message = "User details found.", data = userDetails });
            }
            catch (Exception e)
            {
                return new OkObjectResult(NotFound(new
                    { code = 404, message = "Details not found. You'll need to POST some." }));
            }
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
        public IActionResult UploadUserDetails([FromForm] UserDetailsRequest detailsRequest)
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

        [Helpers.Authorize]
        [HttpPatch("UpdateUserDetails")]
        public IActionResult UpdateUserDetails([FromForm] UserDetailsRequest detailsRequest)
        {
            try
            {
                _user.UpdateUserDetails(detailsRequest);
                return Ok(new { code = 200, message = "Details have been updated." });
            }
            catch (Exception e)
            {
                return BadRequest(new { code = 400, message = "Something went wrong. Whoops. Error: " + e.Message });
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
                    message = "Registration failed.",
                    errorMessage = e.Message
                });
            }
        }
    }
}
