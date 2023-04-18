namespace CVEasy_API.DTOs;

public class ThemeRequest
{
    public int ThemeId { get; set; }
    public int UserId { get; set; }
    public string? ThemeName { get; set; }
    public string? ThemeDescr { get; set; }
    public string? Version { get; set; }
}