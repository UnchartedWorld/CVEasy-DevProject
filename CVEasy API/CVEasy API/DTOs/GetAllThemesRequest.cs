namespace CVEasy_API.DTOs
{
    public class GetAllThemesRequest
    {
        // these are your search parameters
        public string? createdByName { get; set; }
        public string? themeName { get; set; }

        // these are for paging
        // pageIndex is for the current page the user is on
        public int pageIndex { get; set; }
        // pageSize is how many data is returned per page
        public int pageSize { get; set; }
    }
}
