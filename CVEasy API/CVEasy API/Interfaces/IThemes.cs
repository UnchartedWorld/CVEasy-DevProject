using CVEasy_API.DTOs;
using CVEasy_API.Model;

namespace CVEasy_API.Interfaces
{
    public interface IThemes
    {
        // returning with paging
        public GetThemePaging GetAllThemes(GetAllThemesRequest request);
        // Adds ability to upload theme
        public void UploadTheme(UploadRequest uploadRequest);
        public GetThemeResponse GetTheme(int themeId);
        public void RemoveTheme(int themeId);
        public void UpdateTheme(ThemeRequest themeRequest);
    }
}
