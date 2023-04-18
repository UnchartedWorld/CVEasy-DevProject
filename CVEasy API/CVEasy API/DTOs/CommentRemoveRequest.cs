using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.DTOs;

public class CommentRemoveRequest
{
    [Required] public int UserID { get; set; }
    [Required] public int ThemeID { get; set; }
    [Required] public int CommentId { get; set; }
}