using CVEasy_API.Data;
using CVEasy_API.DTOs;
using CVEasy_API.Helpers;
using CVEasy_API.Model;

namespace CVEasy_API.Services;

using Interfaces;

public class UserService : IUser // This can be re-used to get all users in other interfaces/classes - OOP baby.
{
    private DataContext _dataContext; // Initiates a new data context each time it's called. 
    private IAuthentication _authentication;
    private IHttpContextAccessor _httpContextAccessor;

    public UserService(DataContext data, IAuthentication authentication,
        IHttpContextAccessor httpContextAccessor) // Constructor
    {
        _dataContext = data;
        _authentication = authentication;
        _httpContextAccessor = httpContextAccessor;
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

        // var token = _authentication.GenerateJwtToken(userListResponse);

        return userListResponse;
    }

    public GetUserInfoResponse GetUserInfo(int userId)
    {
        var userInfo = _dataContext.TableUser.FirstOrDefault(x => x.userID == userId);

        if (userInfo == null)
        {
            throw new KeyNotFoundException("User not found, cannot return details");
        }

        var response = new GetUserInfoResponse
        {
            userId = userId,
            username = userInfo.loginName
        };

        return response;
    }

    public GetUserDetailsResponse GetUserDetails(int userId)
    {
        AccountLogin userLogin = (AccountLogin)_httpContextAccessor.HttpContext.Items["UserLogin"];

        var userDetails = _dataContext.TableUserDetails.FirstOrDefault(x => x.userID == userId);

        var response = new GetUserDetailsResponse
        {
            userID = userId,
            firstName = userDetails.firstName,
            lastName = userDetails.lastName,
            middleNames = userDetails.middleNames,
            phoneNum = userDetails.phoneNum,
            userDetailsID = userDetails.userDetailsID
        };

        return response;
    }

    public void UploadUserDetails(UserDetailsRequest detailsRequest)
    {
        var newUserDetails = new TableUserDetails
        {
            firstName = detailsRequest.firstName,
            lastName = detailsRequest.lastName,
            middleNames = detailsRequest.middleNames,
            phoneNum = (int)detailsRequest.phoneNum,
            userID = detailsRequest.UserID
        };
        _dataContext.TableUserDetails.Add(newUserDetails);
        _dataContext.SaveChanges();
    }

    public void UpdateUserDetails(UserDetailsRequest detailsRequest)
    {
        AccountLogin userLogin = (AccountLogin)_httpContextAccessor.HttpContext.Items["UserLogin"];

        var userDetailsToUpdate = _dataContext.TableUserDetails.FirstOrDefault(x => x.userID == detailsRequest.UserID);

        if (userDetailsToUpdate == null)
        {
            throw new Exception("Details cannot be updated, there isn't details TO update.");
        }

        if (userDetailsToUpdate.userID != userLogin?.Id)
        {
            throw new Exception("You don't own this account. How did you even pull this one off?");
        }

        userDetailsToUpdate.firstName = detailsRequest.firstName ?? userDetailsToUpdate.firstName;
        userDetailsToUpdate.middleNames = detailsRequest.middleNames ?? userDetailsToUpdate.middleNames;
        userDetailsToUpdate.lastName = detailsRequest.lastName ?? userDetailsToUpdate.lastName;
        userDetailsToUpdate.phoneNum = detailsRequest.phoneNum ?? userDetailsToUpdate.phoneNum;

        _dataContext.Update(userDetailsToUpdate);
        _dataContext.SaveChanges();
    }
}