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
        // api/GetAllComments
        [HttpGet("GetAllComments")]
        public IActionResult GetComments([FromQuery] GetAllCommentsRequest commentsRequest)
        {
            var dataResult = _comments.GetAllComments(commentsRequest);
            return Ok(new { code = 200, message = "Data received for comments.", data = dataResult });
        }

        // PATCH: api/RemoveComment
        [Helpers.Authorize]
        [HttpPatch("RemoveComment")]
        public IActionResult RemoveComment([FromForm] CommentRemoveRequest removeRequest)
        {
            _comments.RemoveComment(removeRequest);

            return Ok("Comment has been deleted, thank you");
        }

        [Helpers.Authorize]
        [HttpPatch("UpdateComment")]
        public IActionResult UpdateComment([FromForm] CommentRequest commentRequest)
        {
            try
            {
                _comments.UpdateComment(commentRequest);

                return Ok(new { code = 200, message = "Comment successfully updated" });
            }
            catch (Exception e)
            {
                return BadRequest(new
                    { code = 400, message = "Comment failed to update." });
            }
        }

        // POST: api/PostComment
        [Helpers.Authorize]
        [HttpPost("PostComment")]
        public IActionResult PostComment([FromForm] CommentRequest commentRequest)
        {
            try
            {
                _comments.SubmitComment(commentRequest);

                return Ok("Nice, your comment is as such: " + commentRequest.Comment + ", and is from the UserID: " +
                          commentRequest.UserID);
            }
            catch (Exception e)
            {
                return BadRequest(new { code = 400, message = "Comment wasn't posted for some unknown reason." });
            }
        }
        
    }
}