using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.Model;

public class TableComments
{
    [Key]
    public int commentID { get; set; }
    public int themeID { get; set; }
    public int userID { get; set; }
    public string comment { get; set; }
}