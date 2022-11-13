using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.Model;

public class TableCategoryDetails
{
    [Key]
    public int categoryDetailsID { get; set; }
    public int categoryID { get; set; }
    public byte[] value { get; set; }
}