namespace CVEasy_API.DTOs;

public class UserListResponse
{
    public int UserId { get; set; }
    public string LoginName { get; set; }
    public string Email { get; set; }

    public UserListResponse (int id, string logName, string mail)
    {
        UserId = id;
        LoginName = logName;
        Email = mail;
    }
}