using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.Model;

public class UserRegistrationRequest
{
    [Required, EmailAddress] 
    public string Email { get; set; } = string.Empty;
    [Required, MinLength(8, ErrorMessage = "Password can be no shorter than 8 characters.")]
    public string Password { get; set; } = string.Empty;
    [Required, Compare("Password")]
    public string ConfirmPassword { get; set; } = string.Empty;
}