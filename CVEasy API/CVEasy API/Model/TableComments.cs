using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.Model;

public class TableComments
{
    [Key]
    public int commentID { get; set; }
    public byte[] comment { get; set; }
}