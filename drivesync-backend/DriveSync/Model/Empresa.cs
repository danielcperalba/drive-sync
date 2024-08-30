using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DriveSync.Validation;

namespace DriveSync.Model
{
    [Table("Empresas")]
    public class Empresa
    {
        public int id { get; set; }
        [Required]
        [StringLength(200)]
        public string nome { get; set; }
        [Required]
        [StringLength(20)]
        public string cnpj { get; set; }
        [Required]
        [StringLength(200)]
        public string endereco { get; set; }
        [Required]
        [StringLength(200)]
        [EmailAddress]
        public string email { get; set; }
        [Required]
        [StringLength(20)]
        public string telefone { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime? data_cadastro { get; set; }
        
        public Empresa(string nome, string cnpj, string endereco, string email, string telefone)
        {
            ValidateDomain(nome, cnpj, endereco, email, telefone);
        }

        public Empresa(int id, string nome, string cnpj, string endereco, string email, string telefone)
        {
            ExceptionValidation.When(id < 0, "Invalid ID value");
            id = id;
            ValidateDomain(nome, cnpj, endereco, email, telefone);
        }

        public void UpdateEmpresa(string nome, string cnpj, string endereco, string email, string telefone)
        {
            ValidateDomain(nome, cnpj, endereco, email, telefone);
        }

        private void ValidateDomain(string nome, string cnpj, string endereco, string email, string telefone)
        {
            #region Validação do campo Nome
            ExceptionValidation.When(string.IsNullOrEmpty(nome),
                "Modelo inválido. O campo 'nome' não pode ser nulo!");
            ExceptionValidation.When(Regex.IsMatch(nome, @"[^a-zA-Z0-9]"),
                "Modelo inválido. O nome da empresa não pode ter caracter especial");
            #endregion

            #region Validações do campo cnpj
            ExceptionValidation.When(string.IsNullOrEmpty(cnpj),
                "Modelo inválido. O campo 'cnpj' não pode ser nulo!");
            ExceptionValidation.When(cnpj.Lenght < 14 || cnpj.Lenght > 14,
                "Modelo inválido. O cnpj deve possuir 14 dígitos.");
            ExceptionValidation.When(Regex.IsMatch(cnpj, @"[^a-zA-Z0-9]"),
                "Modelo inválido. O cnpj não pode ter caracter especial");
            #endregion

            #region Validações do campo endereco
            ExceptionValidation.When(string.IsNullOrEmpty(endereco),
                "Modelo inválido. O campo 'endereco' não pode ser nulo!");
            ExceptionValidation.When(endereco.Lenght < 3,
                "Modelo inválido. O endereço não pode ser menor que 3 dígitos dígitos.");
            #endregion

            #region Validações do campo email
            ExceptionValidation.When(string.IsNullOrEmpty(email),
                "Modelo inválido. O campo 'email' não pode ser nulo!");
            #endregion

            #region Validações do campo telefone
            ExceptionValidation.When(string.IsNullOrEmpty(telefone),
                "Modelo inválido. O campo 'telefone' não pode ser nulo!");
            #endregion

            nome = nome;
            cnpj = cnpj;
            endereco = endereco;
            email = email;
            telefone = telefone;
        }
    }
}