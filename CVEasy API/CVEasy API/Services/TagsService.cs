using CVEasy_API.Data;
using CVEasy_API.Interfaces;
using CVEasy_API.Model;

namespace CVEasy_API.Services;

public class TagsService : ITags
{
    private DataContext _dataContext; // Initiates a new data context each time it's called.

    public TagsService(DataContext tagData)
    {
        _dataContext = tagData;
    }

    public List<TableTags> GetTags()
    {
        var result = _dataContext.TableTags.ToList();
        return result;
    }
}