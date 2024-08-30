using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DriveSync.Validation;

namespace DriveSync.Model
{
    [Table("Multas")]
    public class Multa
    {
        public int id { get; set; }
        //[Required]
        //public int IdVeiculo { get; set; }
        [Required]
        public int idviagem { get; set; }
        [Required]
        [StringLength(20)]
        public string codigo { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime? dtmulta { get; set; }
        [Required]
        [StringLength(50)]
        public string tpinfracao { get; set; }
        [Required]
        public decimal valor { get; set; }
        [Required]
        public int ptscarteira { get; set; }
        [Required]
        [StringLength(200)]
        public string descricao { get; set; }
        public int veiculoid { get; set; } 
        
        public Multa(string codigo, string tpinfracao, decimal valor, int ptscarteira, string descricao)
        {
            ValidateDomain(codigo, tpinfracao, valor, ptscarteira, descricao);
        }
        public Multa(int id, string codigo, string tpinfracao, decimal valor, int ptscarteira, string descricao)
        {
            ExceptionValidation.When(id < 0, "Invalid id value");
            id = id;
            ValidateDomain(codigo, tpinfracao, valor, ptscarteira, descricao);
        }
        public void UpdateMulta(string codigo, string tpinfracao, decimal valor, int ptscarteira, string descricao)
        {
            ValidateDomain(codigo, tpinfracao, valor, ptscarteira, descricao);
        }

        private void ValidateDomain(string codigo, string tpinfracao, decimal valor, int ptscarteira, string descricao)
        {
            #region Validações do campo codigo
            ExceptionValidation.When(string.IsNullOrEmpty(codigo),
                "Modelo inválido. O campo 'codigo' não pode ser nulo!");
            ExceptionValidation.When(codigo.Lenght < 5 || codigo.Length > 5,
                "Modelo inválido. Insira um código de multa válido!");
            #endregion

            #region Validações do campo tpinfracao
            ExceptionValidation.When(string.IsNullOrEmpty(tpinfracao),
                "Tipo de Infração inválido. O campo Tipo da Infração não pode ser nulo!");
            ExceptionValidation.When(tpinfracao.Length < 3,
                "Tipo de Infração inválido. O tipo da infração não pode ser meno que 3 dígitos.");
            #endregion

            #region Validações do campo valor
            ExceptionValidation.When(decimal.IsNullOrEmpty(valor),
                "Valor inválido. O campo 'valor' não pode ser nulo!");
            ExceptionValidation.When(valor < 0,
                "Valor inválido. O valor não pode ser menor que zero.");
            #endregion

            #region Validações do campo ptscarteira
            ExceptionValidation.When(int.IsNullOrEmpty(ptscarteira),
                "Pontos de Carteira inválido. O campo 'Pontos na Carteira' não pode ser nulo!");
            ExceptionValidation.When(ptscarteira < 0,
                "Pontos de Carteira inválido. O ponto na carteira não pode ser menor que zero");
            #endregion

            #region Validações do campo descricao
            ExceptionValidation.When(string.IsNullOrEmpty(descricao),
                "Descrição inválida. O campo descrição não pode ser nulo!");
            ExceptionValidation.When(descricao.Length > 200,
                "Descrição inválida. A descrição não pode passar de 200 caracteres");
            #endregion

            codigo = codigo;
            tpinfracao = tpinfracao;
            valor = valor;
            ptscarteira = ptscarteira;
            descricao = descricao;
        }
    }
}
