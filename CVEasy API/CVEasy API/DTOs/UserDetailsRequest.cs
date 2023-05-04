using System.ComponentModel.DataAnnotations;


namespace CVEasy_API.DTOs;

public class UserDetailsRequest
{
    [Required] public int UserID { get; set; }
    public string? firstName { get; set; }
    public string? middleNames { get; set; }
    public string? lastName { get; set; }
    public int? phoneNum { get; set; }
}