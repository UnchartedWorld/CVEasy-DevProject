using CVEasy_API.DTOs;

namespace CVEasy_API.Interfaces;

public interface IAuthentication
{
    public void RegisterUser(UserRegistrationRequest registrationRequest);
    public bool VerifyUserPassword(string userInputPassword, string userPasswordHash, byte[] userPasswordSalt);
    public string GenerateJwtToken(UserListResponse user);
}