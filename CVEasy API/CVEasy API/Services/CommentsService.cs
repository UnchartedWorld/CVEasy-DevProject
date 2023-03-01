using CVEasy_API.Data;
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

    public List<TableComments> GetComments()
    {
        var result = _dataContext.TableComments.ToList();
        return result;
    }

}