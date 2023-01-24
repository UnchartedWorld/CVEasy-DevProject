using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.Model;

public class UserLoginRequest
{
    [Required] public string Username { get; set; } = string.Empty;

    [Required, EmailAddress] public string Email { get; set; } = string.Empty;
}