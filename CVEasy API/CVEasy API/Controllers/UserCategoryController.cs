using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CVEasy_API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CVEasy_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserCategoryController : ControllerBase
    {
        private IUserCategory _category;

        public UserCategoryController(IUserCategory userCategory)
        {
            _category = userCategory;
        }
        
        // GET: api/UserCategory
        [HttpGet]
        public IActionResult Get()
        {
            var dataResult = _category.GetUserCategory();
            return Ok(new { code = 200, message = "Data retrieved.", data = dataResult });
        }

        // // GET: api/UserCategory/5
        // [HttpGet("{id}", Name = "Get")]
        // public string Get(int id)
        // {
        //     return "value";
        // }

        // POST: api/UserCategory
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/UserCategory/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/UserCategory/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
