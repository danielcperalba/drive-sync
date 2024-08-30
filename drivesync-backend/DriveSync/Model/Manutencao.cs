using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DriveSync.Model
{
    [Table("Manutencao")]
    public class Manutencao
    {
        public int Id { get; set; }
        
        /*[Required]
        public int id_veiculo { get; set; }*/
        
        [Required]
        public DateTime? dt_manutencao { get; set; }

        [Required]
        public DateTime? dt_prox_manutencao { get; set; }
        
        [Required]
        public string tp_manutencao { get; set; }
        
        [Required]
        public string veiculo { get; set; }
        
        [Required]
        [StringLength(100)]
        public string servico { get; set; }
        
        [Required]
        public float valor { get; set; }
        
        [Required]
        [StringLength(1000)]
        public string descricao { get; set; }

        public int veiculoId { get; set; }

        public Manutencao(string tp_manutencao, string servico, float valor, string descricao)
        {
            ValidateDomain(tp_manutencao, servico, valor, descricao);
        }
        public Manutencao(int id, string tp_manutencao, string servico, float valor, string descricao)
        {
            ExpectionValidation.When(id < 0, "Invalid id value");
            id = id;
            ValidateDomain(tp_manutencao, servico, valor, descricao);
        }
        public UpdateManutencao(string tp_manutencao, string servico, float valor, string descricao)
        {
            ValidateDomain(tp_manutencao, servico, valor, descricao);
        }
        private void ValidateDomain(string tp_manutencao, string servico, float valor, string descricao)
        {
            #region Validações do campo tp_manutencao
            ExceptionValidation.When(string.IsNullOrEmpty(tp_manutencao),
                "Tipo de Manutenção inválido. O campo 'Tipo de Manutenção' não pode ser nulo!");
            ExceptionValidation.When(tp_manutencao.Lenght < 3,
                "Tipo de Manutenção inválido. O Tipo de Manutenção não pode ser menor que três caracteres.");
            #endregion

            #region Validações do campo servico
            ExceptionValidation.When(string.IsNullOrEmpty(servico),
                "Serviço inválido. O campo 'Servico' não pode ser nulo!");
            ExceptionValidation.When(servico.Length < 3,
                "Serviço inválido. O Serviço não pode ser menor que três caracteres.");
            #endregion

            #region Validações do campo valor
            ExceptionValidation.When(float.IsNullOrEmpty(valor),
                "Valor inválido. O campo 'Valor' não pode ser nulo!");
            ExceptionValidation.When(valor < 0,
                "Valor inválido. O Valor não pode ser menor que zero.");
            #endregion

            #region Validações do campo descricao
            ExceptionValidation.When(string.IsNullOrEmpty(descricao),
                "Descrição inválida. O campo 'Descrição' não pode ser nulo!");
            ExceptionValidation.When(descricao.Length < 3 || descricao.Length > 1000,
                "Descrição inválida. A Descrição não pode ser menor que três caracteres ou maior que mil.");
            #endregion

            tp_manutencao = tp_manutencao;
            servico = servico;
            valor = valor;
            descricao = descricao;
        }
    }
}
