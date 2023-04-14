using Microsoft.Build.Framework;

namespace CVEasy_API.DTOs;

public class GetThemeRequest
{
    [Required] public int ThemeID { get; set; }
}