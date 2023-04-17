using CVEasy_API.DTOs;
using CVEasy_API.Interfaces;
using CVEasy_API.Model;
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
        //[HttpGet]
        // // GET: api/Comments/5
        // [HttpGet("{id}", Name = "Get")]
        // public string Get(int id)
        // {
        //     return "value";
        // }
        
        // PATCH: api/RemoveComment
        [Helpers.Authorize]
        [HttpPatch("RemoveComment")]
        public IActionResult RemoveComment([FromForm] CommentRemoveRequest removeRequest)
        {
            _comments.RemoveComment(removeRequest);

            return Ok("Comment has been deleted, thank you");
        }
        
        // POST: api/PostComment
        [Helpers.Authorize]
        [HttpPost("PostComment")]
        public IActionResult PostComment([FromForm] CommentRequest commentRequest)
        {
            _comments.SubmitComment(commentRequest);

            return Ok("Nice, your comment is as such: " + commentRequest.Comment + ", and is from the UserID: " + commentRequest.UserID);
        }
        
        // POST: api/GetAllComments
        [HttpPost("GetAllComments")]
        public IActionResult GetComments([FromForm] GetAllCommentsRequest commentsRequest)
        {
            var dataResult = _comments.GetAllComments(commentsRequest);
            return Ok(new { code = 200, message = "Data received for comments.", data = dataResult });
        }

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
