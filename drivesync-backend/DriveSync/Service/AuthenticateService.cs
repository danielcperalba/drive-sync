using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using DriveSync.Model;

namespace DriveSync.Service
{
    public class AuthenticateService : IAuthenticate
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthenticateService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<bool> Authenticate(string email, string senha)
        {
            var result = await _signInManager.PasswordSignInAsync(email, senha, isPersistent: false, lockoutOnFailure: false);
            return result.Succeeded;
        }

        public async Task<bool> RegisterUser(string email, string senha, string primeiroNome, string sobrenome, int empresaId, string cargo, string telefone, string role)
        {
            var appUser = new ApplicationUser
            {
                UserName = email,
                Email = email,
                PrimeiroNome = primeiroNome,
                Sobrenome = sobrenome,
                EmpresaId = empresaId,
                Cargo = cargo,
                Telefone = telefone
            };

            var result = await _userManager.CreateAsync(appUser, senha);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(appUser, role);
                await _signInManager.SignInAsync(appUser, isPersistent: false);
            }

            return result.Succeeded;
        }

        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
