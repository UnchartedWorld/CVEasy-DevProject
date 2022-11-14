using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.Model;

public class TableUser
{
    [Key]
    public int userID { get; set;  }
    public string loginName { get; set; }
    public string passwordHash { get; set; }
    public string passwordSalt { get; set; }
    public string email { get; set; }
}