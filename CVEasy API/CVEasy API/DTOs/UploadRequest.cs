using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.DTOs;

public class UploadRequest
{
    [Required] public int UserID { get; set; }
    [Required][StringLength(300)] public string ThemeTitle { get; set; } = string.Empty;
    [Required] public IFormFile File { get; set; }
    [Required][StringLength(5100)] public string ThemeDescr { get; set; } = string.Empty;
    [Required][StringLength(30)] public string ThemeVersion { get; set; } = string.Empty;
}