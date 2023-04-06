namespace CVEasy_API.DTOs;

public class GetCommentResponse
{
    public int commentID { get; set; }
    public int themeID { get; set; }
    public byte[] comment { get; set; }
    
}