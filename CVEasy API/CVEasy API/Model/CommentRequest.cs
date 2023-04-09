using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.Model;

public class CommentRequest
{
    [Required] public int UserID { get; }
    [Required] public int ThemeID { get; }
    [Required][StringLength(500)] public string Comment { get; set; } = string.Empty;
}