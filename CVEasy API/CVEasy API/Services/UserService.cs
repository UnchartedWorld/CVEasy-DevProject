using CVEasy_API.Data;
using CVEasy_API.DTOs;
using CVEasy_API.Model;

namespace CVEasy_API.Services;

using Interfaces;

public class UserService : IUser // This can be re-used to get all users in other interfaces/classes - OOP baby.
{
    private DataContext _dataContext; // Initiates a new data context each time it's called. 
    private IAuthentication _authentication;

    public UserService(DataContext data, IAuthentication authentication) // Constructor
    {
        _dataContext = data;
        _authentication = authentication;
    }

    /// <summary>
    /// This does a few things. First, it retrieves the email from the DB and compares it to the provided email via loginRequest.
    /// Then, it makes sure to check if it's null and returns it if it is. Assuming it isn't, it then will retrieve the stored
    /// hash and salt, alongside the provided password and call to the verify password function. Assuming that passes, it
    /// it will finally make a new UserListResponse and return that.
    /// </summary>
    /// <param name="loginRequest">Handles the user's provided details, i.e. email & password for use in the function</param>
    /// <returns>Either null if conditions aren't met, or UserListResponse</returns>
    public UserListResponse? GetUser(UserLoginRequest loginRequest)
    {
        var user = _dataContext.TableUser.FirstOrDefault(x => x.email == loginRequest.Email);

        if (user == null) return null;

        var password = loginRequest.Password;
        var hash = user.passwordHash;
        var salt = user.passwordSalt;

        var isValid = _authentication.VerifyUserPassword(password, hash, Convert.FromBase64String(salt));

        if (isValid == false)
        {
            return null;
        }

        var userListResponse = new UserListResponse
        (
            user.userID,
            user.email
        );

        return userListResponse;
    }
}