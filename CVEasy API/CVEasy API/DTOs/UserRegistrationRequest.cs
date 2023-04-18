using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.DTOs;

public class UserRegistrationRequest
{
    [Required] 
    public string Username { get; set; } = string.Empty;
    [Required, EmailAddress] 
    public string Email { get; set; } = string.Empty;
    [Required, MinLength(8, ErrorMessage = "Password can be no shorter than 8 characters.")]
    public string Password { get; set; } = string.Empty;
}