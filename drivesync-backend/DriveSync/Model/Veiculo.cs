using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DriveSync.Validation;

namespace DriveSync.Model
{
    [Table("Veiculos")]
    public class Veiculo
    {
        public int id { get; set; }
        [Required]
        [StringLength(80)]
        public string marca { get; set; }
        [Required]
        [StringLength(80)]
        public string modelo { get; set; }
        [Required]
        public int? ano { get; set; }
        [Required]
        [StringLength(80)]
        public string placa { get; set; }
        [Required]
        public int? quilometragem { get; set; }
        [Required]
        [StringLength(80)]
        public string tp_combustivel { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime? dt_aquisicao { get; set; }
        public string status { get; set; }
        public string cap_passageiros { get; set; }
        public string categoria { get; set; }
        [StringLength(12)]
        public string nmr_chassi { get; set; }
        public string renavam { get; set; }
        public string cor { get; set; }
        public ICollection<Manutencao> manutencoes { get; } = new List<Manutencao>();


        public Veiculo(string modelo, string marca, int ano, string placa, int quilometragem, string tp_combustivel)
        {
            ValidateDomain(modelo, marca, ano, placa, quilometragem, tp_combustivel);
        }
        public Veiculo(int id, string modelo, string marca, int ano, string placa, int quilometragem, string tp_combustivel)
        {
            ExceptionValidation.When(id < 0, "Invalid ID value");
            id = id;
            ValidateDomain(modelo, marca, ano, placa, quilometragem, tp_combustivel);
        }
        public void UpdateVeiculo(string modelo, string marca, int ano, string placa, int quilometragem, string tp_combustivel)
        {
            ValidateDomain(modelo, marca, ano, placa, quilometragem, tp_combustivel);
        }
        private void ValidateDomain(string modelo, string marca, int ano, string placa, int quilometragem, string tp_combustivel)
        {
            #region Validações do campo modelo
            ExceptionValidation.When(string.IsNullOrEmpty(modelo),
                "Modelo inválido. O campo 'modelo' não pode ser nulo!");
            ExceptionValidation.When(modelo.Lenght < 3,
                "Modelo inválido. O nome do modelo não pode ser menor que três.");
            ExceptionValidation.When(modelo.IsMatch(input, @"[^a-zA-Z0-9]"),
                "Modelo inválido. O nome do modelo não pode ter caracter especial");
            #endregion

            #region Validações do campo marca
            ExceptionValidation.When(string.IsNullOrEmpty(marca),
                "Marca inválida. O campo 'marca' não pode ser nulo!");
            ExceptionValidation.When(marca.Lenght < 3,
                "Marca inválida. O nome da marca não pode ser menor que 3 caracteres");
            ExceptionValidation.When(marca.IsMatch(input, @"[^a-zA-Z0-9]"),
                "Modelo inválido. O nome do modelo não pode ter caracter especial");
            #endregion

            #region Validações do campo ano
            ExceptionValidation.When(ano.Lenght < 4,
                "Ano inválido. Preencha um ano válido");
            ExceptionValidation.When(ano < 1900,
                "Ano inválido. Use um ano válido");
            #endregion

            #region Validações do campo placa
            ExceptionValidation.When(string.IsNullOrEmpty(placa),
                "Placa inválida. O campo 'placa' não pode ser nulo!");
            ExceptionValidation.When(placa.Lenght < 7,
                "Placa inválida. Informe a identificação da placa corretamente.");
            ExceptionValidation.When(Regex.IsMatch(placa, @"[^a-zA-Z0-9]"),
                "Modelo inválido. A placa não pode ter caracter especial");
            #endregion

            #region Validações do campo quilometragem
            ExceptionValidation.When(quilometragem < 0,
                "Quilometragem inválida. A quilometragem não pode ser menor que zero");
            #endregion

            #region Validações do campo tp_combustivel
            ExceptionValidation.When(string.IsNullOrEmpty(tp_combustivel),
                "Tipo de Combustível Inválido. O tipo do combustível não pode ser nulo.");
            ExceptionValidation.When(tp_combustivel.Lenght < 7,
                "Placa inválida. Informe a identificação da placa corretamente.");
            ExceptionValidation.When(Regex.IsMatch(tp_combustivel, @"[^a-zA-Z0-9]"),
                "Modelo inválido. A placa não pode ter caracter especial");
            #endregion

            #region Validações do campo dt_aquisicao
            ExceptionValidation.When(dt_aquisicao < 8,
                "Dada inválida. Este não é o padrão para data");
            #endregion

            modelo = modelo;
            marca = marca;
            ano = ano;
            placa = placa;
            quilometragem = quilometragem;
            tp_combustivel = tp_combustivel;
        }
    }
}
