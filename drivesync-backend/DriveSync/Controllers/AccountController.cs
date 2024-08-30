using DriveSync.Service;
using DriveSync.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DriveSync.Controllers
{
    //[Authorize("Authorize")]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IAuthenticate _authentication;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(IConfiguration configuration, IAuthenticate authentication, RoleManager<IdentityRole> roleManager)
        {
            _configuration = configuration ??
                throw new ArgumentNullException(nameof(configuration));

            _authentication = authentication ??
                throw new ArgumentNullException(nameof(authentication));

            _roleManager = roleManager;
        }

        [HttpPost("CreateUser")]
        public async Task<ActionResult<UserToken>> CreateUser([FromBody] RegisterModel model)
        {
            if (model.Senha != model.ConfirmaSenha)
            {
                ModelState.AddModelError("ConfirmaSenha", "As senhas não conferem");
                return BadRequest(ModelState);
            }

            var result = await _authentication.RegisterUser(model.Email, model.Senha, model.PrimeiroNome, model.Sobrenome, model.EmpresaId, model.Cargo, model.Telefone, model.Role);

            var role = model.Role;
            var roleName = "";

            if (result)
            {
                switch (role)
                {
                    case "Administrador":
                        var roleName = _roleManager.FindByNameAsync("Administrador").Result;
                        break;
                    case "Motorista":
                        var roleName = _roleManager.FindByNameAsync("Motorista").Result;
                        break;
                    case "Empresa":
                        var roleName = _roleManager.FindByNameAsync("Empresa").Result;
                        break;
                    case "Root":
                        var roleName = _roleManager.FindByNameAsync("Root").Result;
                        break;
                }

                IdentityResult roleResult = await _userManager.AddToRoleAsync(user, roleName.Name);
                return Ok($"Usuário {model.PrimeiroNome} {model.Sobrenome} criado com sucesso!");
            }
            else
            {
                ModelState.AddModelError("Cadastro de Usuário:", "Registro inválido. Verifique as informações de registro.");
                return BadRequest(ModelState);
            }
        }

        [HttpPost("LoginUser")]
        public async Task<ActionResult<UserToken>> Login([FromBody] LoginModel userInfo)
        {
            var result = await _authentication.Authenticate(userInfo.Email, userInfo.Senha);

            if(result)
            {
                return GenerateToken(userInfo);
            }
            else
            {
                ModelState.AddModelError("LoginUser", "Login inválido.");
                return BadRequest(ModelState);
            }
        }

        private ActionResult<UserToken> GenerateToken(LoginModel userInfo)
        {
            var claims = new[]
            {
                new Claim("email", userInfo.Email),
                new Claim("meuToken", "token DriveSync"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddHours(8);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expiration,
                signingCredentials: creds);

            return new UserToken()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration,
            };
        }
    }
}
