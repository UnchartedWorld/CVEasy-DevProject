namespace CVEasy_API.DTOs;

public class GetAllCommentsRequest
{
    public string writtenByName { get; set; }
    public int commentID { get; set; }
    public int themeID { get; set; }
    
    // These are for pagination - useful in lieu of lazy loading
    public int commentIndex { get; set; }
    public int commentSize { get; set; }
}