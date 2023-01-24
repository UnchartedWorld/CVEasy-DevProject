using System.Security.Cryptography;
using System.Text;

namespace CVEasy_API.Services;

//https://code-maze.com/csharp-hashing-salting-passwords-best-practices/ - Uses this guide.
public class AuthenticationService
{
    private const int KeySize = 64;
    private const int Iterations = 350000;
    private readonly HashAlgorithmName _hashAlgorithm = HashAlgorithmName.SHA512;

    string HashUserPassword(string password, out byte[] salt)
    {
        salt = RandomNumberGenerator.GetBytes(KeySize);

        var hash = Rfc2898DeriveBytes.Pbkdf2(
            Encoding.UTF8.GetBytes(password),
            salt,
            Iterations,
            _hashAlgorithm,
            KeySize);

        return Convert.ToHexString(hash);
    }

    bool VerifyUserPassword(string password, string hash, byte[] salt)
    {
        var compareHash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, _hashAlgorithm, KeySize);

        return compareHash.SequenceEqual(Convert.FromHexString(hash));
    }
    
}