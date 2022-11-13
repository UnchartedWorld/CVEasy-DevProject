using CVEasy_API.Model;

namespace CVEasy_API.Interfaces;

public interface IUserCategory
{
    public List<TableUserCategory> GetUserCategory();
}