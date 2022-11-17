using System.ComponentModel.DataAnnotations;

namespace CVEasy_API.Model;

public class TableTags
{
    [Key]
    public int tagID { get; set; }
    public string tag { get; set; }
    public string tagDescr { get; set; }
}