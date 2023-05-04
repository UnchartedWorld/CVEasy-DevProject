namespace CVEasy_API.DTOs;

public class UserLoginResponse
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string JwtToken { get; set; }

    public UserLoginResponse(UserListResponse userListResponse, string jwtToken)
    {
        Id = userListResponse.UserId;
        Email = userListResponse.Email;
        JwtToken = jwtToken;
    }
}