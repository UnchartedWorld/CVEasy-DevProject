using CVEasy_API.Data;
using CVEasy_API.DTOs;
using CVEasy_API.Interfaces;

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
                comment = x.comment
            }).ToList();

        var response = new GetCommentPaging
        {
            TotalComments = listComments.Count(),
            comments = allComments
        };
        return response;
    }
}