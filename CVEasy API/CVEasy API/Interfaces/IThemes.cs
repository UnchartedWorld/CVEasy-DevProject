using CVEasy_API.DTOs;

namespace CVEasy_API.Interfaces
{
    public interface IThemes
    {
        // returning with paging
        public GetThemePaging GetAllThemes(GetAllThemesRequest request);
    }
}
