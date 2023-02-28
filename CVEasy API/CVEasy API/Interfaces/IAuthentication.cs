using CVEasy_API.Model;

namespace CVEasy_API.Interfaces;

public interface IAuthentication
{
    public void RegisterUser(UserRegistrationRequest registrationRequest);
    public bool VerifyUserPassword(string userInputPassword, string userPasswordHash, byte[] userPasswordSalt);
}