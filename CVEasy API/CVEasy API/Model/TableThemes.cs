using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.Model;

public class TableThemes
{
    [Key]
    public int themeID { get; set; }
    public int tagID { get; set; }
    public int createdBy_UserID { get; set; }
    public string? themeName { get; set; }
    public string? themeDescr { get; set; }
    public string themeFile { get; set; }
    public DateTime? deletedDate { get; set; }
    public string? version { get; set; }
}