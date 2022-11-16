using CVEasy_API.Model;

namespace CVEasy_API.Interfaces;

public interface IComments
{
    public List<TableComments> GetComments();
}