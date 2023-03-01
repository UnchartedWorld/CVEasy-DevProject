namespace CVEasy_API.DTOs;

public class UserListResponse
{
    public int UserId { get; set; }
    public string Email { get; set; }

    public UserListResponse (int id, string email)
    {
        UserId = id;
        Email = email;
    }
}