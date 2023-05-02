namespace CVEasy_API.DTOs;

public class GetCommentResponse
{
    public int commentID { get; set; }
    public int themeID { get; set; }
    public int userID { get; set; }
    public string comment { get; set; }
    public string username { get; set; }
    
}