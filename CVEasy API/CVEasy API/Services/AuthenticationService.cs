using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using CVEasy_API.Data;
using CVEasy_API.Interfaces;
using CVEasy_API.DTOs;
using CVEasy_API.Model;
using Microsoft.IdentityModel.Tokens;

namespace CVEasy_API.Services;

//https://code-maze.com/csharp-hashing-salting-passwords-best-practices/ - Uses this guide.
public class AuthenticationService : IAuthentication
{
    private const int KeySize = 64;
    private const int Iterations = 350000;
    private readonly HashAlgorithmName _hashAlgorithm = HashAlgorithmName.SHA512;
    private DataContext _dataContext;

    public AuthenticationService(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

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

    public bool VerifyUserPassword(string password, string hash, byte[] salt)
    {
        var compareHash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, _hashAlgorithm, KeySize);

        return compareHash.SequenceEqual(Convert.FromHexString(hash));
    }


    //
    public void RegisterUser(UserRegistrationRequest registrationRequest)
    {
        var passwordAfterHash = HashUserPassword(registrationRequest.Password, out var salt);

        var newUser = new TableUser
        {
            loginName = registrationRequest.Username,
            email = registrationRequest.Email,
            passwordHash = passwordAfterHash,
            passwordSalt = Convert.ToBase64String(salt)
        };
        _dataContext.TableUser.Add(newUser);
        _dataContext.SaveChanges();

        var newUserRole = new TableUserRole
        {
            userRole = "User",
            userID = newUser.userID
        };

        _dataContext.TableUserRole.Add(newUserRole);
        _dataContext.SaveChanges();

    }
    
    public string GenerateJwtToken(UserListResponse user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes("YjjYgwP4JxbAbFHBCpPp");

        var tokenDescriptor = new SecurityTokenDescriptor();

        tokenDescriptor = new SecurityTokenDescriptor
        {
            // currently only store the UserID in Claims, you can store whatever info you need to pull from the current logged in User
            // just rmb to update getting them in the AccountLogin and JWTMiddleware too
            Subject = new ClaimsIdentity(new[] { new Claim("UserID", user.UserId.ToString()) }),
            // token expires in 48hours
            Expires = DateTime.UtcNow.AddHours(48),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
   
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    } 
}