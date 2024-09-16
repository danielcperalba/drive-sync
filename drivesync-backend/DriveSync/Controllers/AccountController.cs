using DriveSync.Context;
using DriveSync.Service;
using DriveSync.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DriveSync.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IAuthenticate _authentication;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AppDbContext _context;

        public AccountController(IConfiguration configuration, IAuthenticate authentication, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, AppDbContext context)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _authentication = authentication ?? throw new ArgumentNullException(nameof(authentication));
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _roleManager = roleManager ?? throw new ArgumentNullException(nameof(roleManager));
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpPost("CreateUser")]
        public async Task<ActionResult<UserToken>> CreateUser([FromBody] RegisterModel model)
        {
            if (model.Senha != model.ConfirmaSenha)
            {
                ModelState.AddModelError("ConfirmaSenha", "As senhas não conferem");
                return BadRequest(ModelState);
            }

            var empresaId = User.Claims.FirstOrDefault(c => c.Type == "EmpresaId")?.Value;

            if (string.IsNullOrEmpty(empresaId))
            {
                return Unauthorized("Usuário não pertence a nenhuma empresa");
            }

            var result = await _authentication.RegisterUser(model.Email, model.Senha, model.PrimeiroNome, model.Sobrenome, int.Parse(empresaId), model.Cargo, model.Telefone, model.Role);

            if (result)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    ModelState.AddModelError("User", "Usuário não encontrado após registro.");
                    return BadRequest(ModelState);
                }

                var roleName = model.Role;
                if (!string.IsNullOrEmpty(roleName))
                {
                    var role = await _roleManager.FindByNameAsync(roleName);
                    if (role != null)
                    {
                        IdentityResult roleResult = await _userManager.AddToRoleAsync(user, role.Name);
                        if (roleResult.Succeeded)
                        {
                            return Ok($"Usuário {model.PrimeiroNome} {model.Sobrenome} criado com sucesso com a role {roleName}!");
                        }
                        else
                        {
                            ModelState.AddModelError("Role", "Erro ao adicionar a role ao usuário.");
                            return BadRequest(ModelState);
                        }
                    }
                    else
                    {
                        ModelState.AddModelError("Role", "Role não encontrada.");
                        return BadRequest(ModelState);
                    }
                }
                else
                {
                    return Ok($"Usuário {model.PrimeiroNome} {model.Sobrenome} criado com sucesso!");
                }
            }
            else
            {
                ModelState.AddModelError("Cadastro de Usuário: ", "Registro inválido. Verifique as informações de registro.");
                return BadRequest(ModelState);
            }
        }


        [HttpPost("CreateInstitutionalUser")]
        public async Task<ActionResult<UserToken>> CreateInstitutionalUser([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (model.Senha != model.ConfirmaSenha)
            {
                ModelState.AddModelError("ConfirmaSenha", "As senhas não conferem");
                return BadRequest(ModelState);
            }

            var result = await _authentication.RegisterUser(model.Email, model.Senha, model.PrimeiroNome, model.Sobrenome, model.EmpresaId, model.Cargo, model.Telefone, model.Role);

            if (result)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    ModelState.AddModelError("User", "Usuário não encontrado após registro.");
                    return BadRequest(ModelState);
                }

                // Relacionar a empresa ao usuário
                user.EmpresaId = model.EmpresaId;
                var updateResult = await _userManager.UpdateAsync(user);

                if (!updateResult.Succeeded)
                {
                    // Capturar os erros ao tentar atualizar o usuário com o EmpresaId
                    foreach (var error in updateResult.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }
                    return BadRequest(ModelState);
                }

                return Ok($"Usuário Institucional {model.PrimeiroNome} {model.Sobrenome} criado com sucesso!");
            }
            else
            {
                // Detalhar erros do IdentityResult caso falhe
                ModelState.AddModelError("Cadastro de Usuário", "Registro inválido. Verifique as informações de registro.");
                return BadRequest(ModelState);
            }
        }




        [HttpPost("LoginUser")]
        public async Task<ActionResult<UserToken>> Login([FromBody] LoginModel userInfo)
        {
            var user = await _userManager.FindByEmailAsync(userInfo.Email);

            if (user == null)
            {
                ModelState.AddModelError("LoginUser", "Login inválido.");
                return BadRequest(ModelState);
            }

            var result = await _authentication.Authenticate(userInfo.Email, userInfo.Senha);

            if (result)
            {
                if (user.TwoFactorEnabled)
                {
                    var token = await _userManager.GenerateTwoFactorTokenAsync(user, "Email");
                    return Ok(new { Requires2FA = true, Email = userInfo.Email });
                }

                return await GenerateToken(userInfo);
            }
            else
            {
                ModelState.AddModelError("LoginUser", "Login inválido.");
                return BadRequest(ModelState);
            }
        }

        [HttpPost("GenerateToken")]
        public async Task<ActionResult<UserToken>> GenerateToken(LoginModel userInfo)
        {
            var user = await _userManager.FindByEmailAsync(userInfo.Email);

            if (user == null)
            {
                return Unauthorized("Usuário não encontrado.");
            }

            var empresaId = user.EmpresaId?.ToString() ?? string.Empty;

            if (string.IsNullOrEmpty(empresaId))
            {
                return Unauthorized("Usuário não pertence a nenhuma empresa.");
            }

            var claims = new[]
            {
                new Claim("email", userInfo.Email),
                new Claim("EmpresaId", empresaId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
             };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
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



        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            var result = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);
            if (result.Succeeded)
            {
                user.NecessarioRedefinirSenha = false;
                await _userManager.UpdateAsync(user);
                return Ok("Senha redefinida com sucesso!");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
            return BadRequest(ModelState);
        }

        [HttpGet("UserProfile")]
        [Authorize]
        public async Task<IActionResult> GetUserProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                user.UserName,
                user.Email,
                user.PrimeiroNome,
                user.Sobrenome,
                user.EmpresaId,
                user.Cargo,
                user.Telefone,
                user.NecessarioRedefinirSenha
            });
        }
    }
}
