using CVEasy_API.Data;
using CVEasy_API.DTOs;
using CVEasy_API.Helpers;
using CVEasy_API.Interfaces;
using CVEasy_API.Model;

namespace CVEasy_API.Services;

public class CommentsService : IComments
{
    private DataContext _dataContext; // Initiates a new data context each time it's called. 
    private IHttpContextAccessor _httpContextAccessor;

    public CommentsService(DataContext commentsData, IHttpContextAccessor httpContextAccessor)
    {
        _dataContext = commentsData;
        _httpContextAccessor = httpContextAccessor;
    }

    public GetCommentPaging GetAllComments(GetAllCommentsRequest commentsRequest)
    {
        var listComments = _dataContext.TableComments.AsQueryable();

        var allComments = listComments.Skip(commentsRequest.commentIndex * commentsRequest.commentSize)
            .Take(commentsRequest.commentSize)
            .Select(x => new GetCommentResponse
            {
                commentID = x.commentID,
                themeID = x.themeID,
                comment = x.comment
            }).ToList();

        var response = new GetCommentPaging
        {
            TotalComments = listComments.Count(),
            comments = allComments
        };
        return response;
    }

    public void SubmitComment(CommentRequest commentRequest)
    {
        var newComment = new TableComments
        {
            themeID = commentRequest.ThemeID,
            userID = commentRequest.UserID,
            comment = commentRequest.Comment
        };
        _dataContext.TableComments.Add(newComment);
        _dataContext.SaveChanges();
    }

    /// <summary>
    /// Changes a desired comment's body from whatever it was to [Deleted], similar to Reddit
    /// </summary>
    /// <param name="commentRemoveRequest">A model class representing the comment removal request</param>
    public void RemoveComment(CommentRemoveRequest commentRemoveRequest)
    {
        AccountLogin userLogin = (AccountLogin)_httpContextAccessor.HttpContext.Items["UserLogin"];
        
        var commentByUser = _dataContext.TableComments.FirstOrDefault(x =>
            x.userID == commentRemoveRequest.UserID && x.themeID == commentRemoveRequest.ThemeID &&
            x.commentID == commentRemoveRequest.CommentId);

        if (commentByUser == null)
        {
            throw new Exception("User's comment not found. Yikes.");
        }

        if (commentByUser.userID != userLogin?.Id)
        {
            throw new Exception("You didn't make the original comment nor an admin, so you don't get to remove it.");
        }

        commentByUser.comment = "[Deleted]";

        _dataContext.TableComments.Update(commentByUser);
        _dataContext.SaveChanges();
    }

    public void UpdateComment(CommentRequest commentRequest)
    {
        AccountLogin userLogin = (AccountLogin)_httpContextAccessor.HttpContext.Items["UserLogin"];
        
        var commentToUpdate = _dataContext.TableComments.FirstOrDefault(x =>
            x.userID == commentRequest.UserID && x.themeID == commentRequest.ThemeID &&
            x.commentID == commentRequest.CommentID);

        if (commentToUpdate == null)
        {
            throw new Exception("Comment not found. How did you even do this?");
        }

        if (commentToUpdate.userID != userLogin?.Id)
        {
            throw new Exception("You didn't make the comment, so why are you trying to update it?");
        }

        commentToUpdate.comment = commentRequest.Comment;

        _dataContext.TableComments.Update(commentToUpdate);
        _dataContext.SaveChanges();

    }
}