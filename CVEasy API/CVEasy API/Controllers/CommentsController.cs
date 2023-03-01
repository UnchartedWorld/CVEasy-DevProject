using CVEasy_API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CVEasy_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {

        private IComments _comments;

        public CommentsController(IComments comments)
        {
            _comments = comments;
        }
        // GET: api/Comments
        [HttpGet]
        public IActionResult Get()
        {
            var dataResult = _comments.GetComments();
            return Ok(new { code = 200, message = "Data retrieved, showing comments", data = dataResult });
        }

        // // GET: api/Comments/5
        // [HttpGet("{id}", Name = "Get")]
        // public string Get(int id)
        // {
        //     return "value";
        // }

        // POST: api/Comments
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Comments/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
