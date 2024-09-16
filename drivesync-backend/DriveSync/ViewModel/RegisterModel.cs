using System.ComponentModel.DataAnnotations;

namespace DriveSync.ViewModel
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "O email é obrigatório.")]
        [EmailAddress(ErrorMessage = "O email fornecido não é válido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O primeiro nome é obrigatório.")]
        [StringLength(50, ErrorMessage = "O primeiro nome deve ter no máximo 50 caracteres.")]
        public string PrimeiroNome { get; set; }

        [Required(ErrorMessage = "O sobrenome é obrigatório.")]
        [StringLength(50, ErrorMessage = "O sobrenome deve ter no máximo 50 caracteres.")]
        public string Sobrenome { get; set; }

        [Required(ErrorMessage = "O ID da empresa é obrigatório.")]
        [Range(1, int.MaxValue, ErrorMessage = "O ID da empresa deve ser um número positivo.")]
        public int EmpresaId { get; set; }

        [Required(ErrorMessage = "O cargo é obrigatório.")]
        [StringLength(100, ErrorMessage = "O cargo deve ter no máximo 100 caracteres.")]
        public string Cargo { get; set; }

        [Phone(ErrorMessage = "O número de telefone fornecido não é válido.")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "A role é obrigatória.")]
        [StringLength(50, ErrorMessage = "A role deve ter no máximo 50 caracteres.")]
        public string Role { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [DataType(DataType.Password)]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "A senha deve ter entre 6 e 100 caracteres.")]
        public string Senha { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirma senha")]
        [Compare("Senha", ErrorMessage = "As senhas não conferem.")]
        public string ConfirmaSenha { get; set; }

        public bool NecessarioRedefinirSenha { get; set; }
    }
}
