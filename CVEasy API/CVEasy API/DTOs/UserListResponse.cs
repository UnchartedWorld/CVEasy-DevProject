using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.DTOs;

public class UserListResponse
{
    [Key]
    public int userID { get; }
    public string loginName { get; set; }
    public string email { get; set; }
}