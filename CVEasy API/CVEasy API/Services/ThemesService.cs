using CVEasy_API.Controllers;
using CVEasy_API.Data;
using CVEasy_API.Interfaces;
using CVEasy_API.Model;

namespace CVEasy_API.Services;

public class ThemesService : IThemes
{
    private DataContext _dataContext; // Initiates a new data context each time it's called. 

    public ThemesService(DataContext themesData)
    {
        _dataContext = themesData;
    }

    public List<TableThemes> GetThemes()
    {
        var result = _dataContext.TableThemes.ToList();
        return result;
    }
}