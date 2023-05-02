using CVEasy_API.DTOs;
using CVEasy_API.Model;

namespace CVEasy_API.Interfaces;

public interface IUser
{
    public UserListResponse? GetUser(UserLoginRequest loginRequest);
    public GetUserInfoResponse GetUserInfo(int userId);

    public GetUserDetailsResponse GetUserDetails(int userId);
    public void UploadUserDetails(UserDetailsRequest detailsRequest);
    public void UpdateUserDetails(UserDetailsRequest detailsRequest);
}