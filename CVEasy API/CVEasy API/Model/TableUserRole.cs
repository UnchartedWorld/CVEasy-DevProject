using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.Model;

public class TableUserRole
{
    [Key]
    public int userRoleID { get; set; }
    public string userRole { get; set; }
    public int userID { get; set; }
}