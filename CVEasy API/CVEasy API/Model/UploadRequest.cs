using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.Model;

public class UploadRequest
{
    [Required] public int UserID { get; }
    [Required] public string ThemeTitle { get; set; } = string.Empty;
    [Required] public IFormFile File { get; set; }
    [Required] public string ThemeDescr { get; set; } = string.Empty;
    [Required] public string ThemeVersion { get; set; } = string.Empty;
}