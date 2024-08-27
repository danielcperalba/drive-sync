using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DriveSync;
using Xunit;

namespace DriveSync.UnitTest.Model
{
    public class VeiculoTests
    {
        [Fact]
        public void CriarVeiculo_SePlacaInvalida()
        {
            var placaInvalida = "R@K1235";

            var exception = Assert.Throws<ArgumentException>(() => new Veiculo(placaInvalida, "Toyota", "Corolla", 2020, "Branco"));
            Assert.Equal("Plava invalida.", exception.Message);
        }

        [Fact]
        public void CriarVeiculo_SeAnoInvalido()
        {
            var anoInvalido = 2030;

            var exception = Assert.Throws<ArgumentException>(() => new Veiculo("ABC1234", "Toyota", "Corolla", anoInvalido, "Branco"));
        }

        [Fact]
        public void CriarVeiculo_SeDadosValidos()
        {
            var placaValida = "ABC1234";
            var marca = "Toyota";
            var modelo = "Corolla";
            var ano = 2020;
            var cor = "Branco";

            var veiculo = new Veiculo(placaValida, marca, modelo, cor);

            Assert.Equal(placaValida, veiculo.Placa);
            Assert.Equal(marca, veiculo.Marca);
            Assert.Equal(modelo, veiculo.Modelo);
            Assert.Equal(ano, veiculo.Ano);
            Assert.Equal(cor, veiculo.Cor);
        }
    }
}
