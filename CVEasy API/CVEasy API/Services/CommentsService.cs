using CVEasy_API.Data;
using CVEasy_API.DTOs;
using CVEasy_API.Interfaces;
using CVEasy_API.Model;

namespace CVEasy_API.Services;

public class CommentsService : IComments
{
    private DataContext _dataContext; // Initiates a new data context each time it's called. 

    public CommentsService(DataContext commentsData)
    {
        _dataContext = commentsData;
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
//TODO - Implement update method. Almost there, just needs some stuff added.
    public void RemoveComment(CommentRemoveRequest commentRemoveRequest)
    {
        var commentByUser = _dataContext.TableComments.FirstOrDefault((x =>
            (x.userID == commentRemoveRequest.UserID && x.themeID == commentRemoveRequest.ThemeID)));

        if (commentByUser == null) return null;

        var deletedString = "[Deleted]";
        
        var 
    }
}