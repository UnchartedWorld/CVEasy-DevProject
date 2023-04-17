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

        var allowedExtensions = new[] { ".tex" };
        var submittedFileExtension = Path.GetExtension(submitFile.FileName).ToLowerInvariant();

        if (!allowedExtensions.Contains(submittedFileExtension))
        {
            throw new Exception("File extension isn't valid. Please consider what you did.");
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

        string readText = File.ReadAllText("Templates/" + fileName + ".tex", Encoding.UTF8);
        string formattedText = readText.Replace("\t", "    ");
        return formattedText;
    }
}