using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.Model;

public class TableUserCategory
{
    [Key]
    public int categoryID { get; set; }
    public byte categoryName { get; set; }
}