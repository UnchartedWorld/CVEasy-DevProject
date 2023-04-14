using System.Text;

namespace CVEasy_API.Helpers;

public static class FileUpload
{
    public static string SaveTemplate(IFormFile submitFile)
    {
        if (!Directory.Exists("Templates"))
        {
            Directory.CreateDirectory("Templates");
        }

        var fileName = Guid.NewGuid();

        var path = "Templates/" + fileName + ".tex";

        using var stream = File.Create(path);
        submitFile.CopyTo(stream);
        return fileName.ToString();
    }

    public static string? ReadTemplate(string fileName)
    {
        if (!Directory.Exists("Templates/"))
        {
            return null;
        }

        var readText = File.ReadAllText("Templates/" + fileName + ".tex", Encoding.UTF8);
        return readText;
    }
}