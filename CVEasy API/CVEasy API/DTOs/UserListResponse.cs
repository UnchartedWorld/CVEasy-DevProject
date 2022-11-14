using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.DTOs;

public class UserListResponse
{
    public int userID { get; set; }
    public string loginName { get; set; }
    public string email { get; set; }

    public UserListResponse (int id, string logName, string mail)
    {
        userID = id;
        loginName = logName;
        email = mail;
    }
}