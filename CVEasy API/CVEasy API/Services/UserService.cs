using CVEasy_API.Data;
using CVEasy_API.DTOs;

namespace CVEasy_API.Services;
using Interfaces;

public class UserService : IUser // This can be re-used to get all users in other interfaces/classes - OOP baby.
{
    private DataContext _dataContext; // Initiates a new data context each time it's called. 
    public UserService(DataContext data) // Constructor
    {
        _dataContext = data; 
    }

    public List<UserListResponse> GetUser()
    {
        var unfilteredUser = _dataContext.TableUser;
        var dtoList = new List<UserListResponse>();

        if (unfilteredUser is not null)
        {
            dtoList = unfilteredUser.Select(s => new UserListResponse()).ToList();
        }
        return dtoList; // Returns it.
    }
}