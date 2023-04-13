using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.Model;

public class CommentRequest
{
    [Required] public int UserID { get; set; }
    [Required] public int ThemeID { get; set; }
    [Required][StringLength(500)] public string Comment { get; set; } = string.Empty;
}