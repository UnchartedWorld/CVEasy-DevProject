namespace CVEasy_API.DTOs;

public class GetCommentPaging
{
    public int TotalComments { get; set; }
    
    public List<GetCommentResponse> comments { get; set; }
}