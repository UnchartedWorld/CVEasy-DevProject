namespace CVEasy_API.DTOs
{
    public class GetThemePaging
    {
        // totalRecords is for the frontend to determine how many pages are needed
        // numberOfPages = totalRecords / pageSize (this is calc-ed on frontend)
        // i.e: 1 page has 10 records, total = 100 => 10 pages
        public int TotalRecords { get; set; }

        // returning List because multiple themes
        public List<GetThemeResponse> themes { get; set; }
    }
}
