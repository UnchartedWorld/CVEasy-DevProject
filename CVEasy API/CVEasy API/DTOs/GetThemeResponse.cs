namespace CVEasy_API.DTOs
{
    public class GetThemeResponse
    {
        // rn, it's exactly like Table Theme class but it can be changed to whatever you want to return to FrontEnd
        public int themeID { get; set; }
        public int createdByID { get; set; }
        public string createdByUsername { get; set; }
        public string themeName { get; set; }
        public string themeDescr { get; set; }
        public string themeFile { get; set; }
        public DateTime? deletedDate { get; set; }
        public string version { get; set; }
    }
}
