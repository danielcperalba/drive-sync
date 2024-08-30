using System.ComponentModel.DataAnnotations;

namespace DriveSync.ViewModel
{
    public class RegisterModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PrimeiroNome { get; set; }

        [Required]
        public string Sobrenome { get; set; }

        [Required]
        public int EmpresaId { get; set; }

        [Required]
        public string Cargo { get; set; }

        public string Telefone { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Senha { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirma senha")]
        [Compare("Senha", ErrorMessage = "As senhas não conferem")]
        public string ConfirmaSenha { get; set;}
    }
}