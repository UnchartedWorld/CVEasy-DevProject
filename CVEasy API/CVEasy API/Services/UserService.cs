using CVEasy_API.Data;
using CVEasy_API.DTOs;
using CVEasy_API.Model;

namespace CVEasy_API.Services;

using Interfaces;

public class UserService : IUser // This can be re-used to get all users in other interfaces/classes - OOP baby.
{
    private DataContext _dataContext; // Initiates a new data context each time it's called. 

    public UserService(DataContext data) // Constructor
    {
        _dataContext = data;
    }

    public UserListResponse? GetUser(UserLoginRequest loginRequest)
    {
        var dtoCheck =
            _dataContext.TableUser
                .Where
                    (user => user.email == loginRequest.Email || user.loginName == loginRequest.Username)
                .Select
                    (s => new UserListResponse(s.userID, s.loginName, s.email))
                .FirstOrDefault();

        return dtoCheck; // Returns it.
    }
}