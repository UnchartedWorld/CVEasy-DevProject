using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.Model;

public class TableUserDetails
{
    [Key]
    public int userDetailsID { get; set; }
    public int userID { get; set; }
    public string firstName { get; set; }
    public string middleNames { get; set; }
    public string lastName { get; set; }
    public int phoneNum { get; set; }
}