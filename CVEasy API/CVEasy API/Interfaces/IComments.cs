using CVEasy_API.DTOs;
using CVEasy_API.Model;

namespace CVEasy_API.Interfaces;

public interface IComments
{
    public GetCommentPaging GetAllComments(GetAllCommentsRequest commentsRequest);
}