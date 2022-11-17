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
    public class TagsController : ControllerBase
    {

        private ITags _tags;

        public TagsController(ITags tags)
        {
            _tags = tags;
        }
        // GET: api/Tags
        [HttpGet]
        public IActionResult Get()
        {
            var dataResult = _tags.GetTags();
            return Ok(new { code = 200, message = "Data retrieved, showing tags.", data = dataResult });
        }

        // // GET: api/Tags/5
        // [HttpGet("{id}", Name = "Get")]
        // public string Get(int id)
        // {
        //     return "value";
        // }

        // POST: api/Tags
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Tags/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Tags/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
