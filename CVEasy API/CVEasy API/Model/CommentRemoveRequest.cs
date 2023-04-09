using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.Model;

public class CommentRemoveRequest
{
    [Required] public int UserID { get; set; }
    [Required] public int ThemeID { get; set; }
}