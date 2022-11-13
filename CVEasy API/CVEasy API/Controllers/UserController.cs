using CVEasy_API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CVEasy_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUser _user; // Initiates a new data context each time it's called. 
        public UserController(IUser user)
        {
            _user = user;
        }
        // GET: api/User
        [HttpGet]
        public IActionResult Get()
        {
            var dataResult = _user.GetUser();
            return Ok(new { code = 200, message = "Data retrieved", data = dataResult });
        }

        // // GET: api/User/5
        // [HttpGet("{id}", Name = "Get")]
        // public string Get(int id)
        // {
        //     return "value";
        // }

        // POST: api/User
        [HttpPost]
        public void Post([FromBody] string value)
        {
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
