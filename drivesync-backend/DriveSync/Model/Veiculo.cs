using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DriveSync.Model
{
    [Table("Veiculos")]
    public class Veiculo
    {
        public int Id { get; set; } // Alterado para PascalCase
        [Required]
        [StringLength(80)]
        public string Marca { get; set; } // Alterado para PascalCase
        [Required]
        [StringLength(80)]
        public string Modelo { get; set; } // Alterado para PascalCase
        [Required]
        public int? Ano { get; set; } // Alterado para PascalCase
        [Required]
        [StringLength(80)]
        public string Placa { get; set; } // Alterado para PascalCase
        [Required]
        public int? Quilometragem { get; set; } // Alterado para PascalCase
        [Required]
        [StringLength(80)]
        public string TpCombustivel { get; set; } // Alterado para PascalCase
        [Required]
        [DataType(DataType.Date)]
        public DateTime? DtAquisicao { get; set; } // Alterado para PascalCase
        public string Status { get; set; } // Alterado para PascalCase
        public string CapPassageiros { get; set; } // Alterado para PascalCase
        public string Categoria { get; set; } // Alterado para PascalCase
        [StringLength(12)]
        public string NmrChassi { get; set; } // Alterado para PascalCase
        public string Renavam { get; set; } // Alterado para PascalCase
        public string Cor { get; set; } // Alterado para PascalCase
        [Required]
        public int EmpresaId { get; set; } // Alterado para PascalCase
        public ICollection<Manutencao> Manutencoes { get; } = new List<Manutencao>(); // Alterado para PascalCase
    }
}
