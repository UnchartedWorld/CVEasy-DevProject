using CVEasy_API.Data;
using CVEasy_API.Model;

namespace CVEasy_API.Services;
using Interfaces;

public class UserCategoryService : IUserCategory
{
    private DataContext _dataContext;

    public UserCategoryService(DataContext data)
    {
        _dataContext = data;
    }

    public List<TableUserCategory> GetUserCategory()
    {
        var result = _dataContext.TableUserCategory.ToList();
        return result;
    }
}