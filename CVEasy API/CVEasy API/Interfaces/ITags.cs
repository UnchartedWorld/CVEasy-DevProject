using CVEasy_API.Model;

namespace CVEasy_API.Interfaces;

public interface ITags
{
    public List<TableTags> GetTags();
}