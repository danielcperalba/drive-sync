using System;
using System.ComponentModel.DataAnnotations;
using Xunit;

namespace DriveSync.Model.Tests
{
    public class MultaTests
    {
        [Fact]
        public void CriarMulta_SeCodigoInvalido_DeveLancarValidationException()
        {
            var multa = new Multa
            {
                idviagem = 1,
                codigo = null,
                dtmulta = DateTime.Now,
                tpinfracao = "Excesso de velocidade",
                valor = 200.0m,
                ptscarteira = 5,
                descricao = "Excedeu o limite de velocidade em 20 km/h",
                veiculoid = 1
            };

            var exception = Assert.Throws<ValidationException>(() => ValidateModel(multa));
            Assert.Contains("codigo", exception.Message);
        }

        [Fact]
        public void CriarMulta_SeDtMultaInvalida_DeveLancarValidationException()
        {
            var multa = new Multa
            {
                idviagem = 1,
                codigo = "A12345",
                dtmulta = null,
                tpinfracao = "Excesso de velocidade",
                valor = 200.0m,
                ptscarteira = 5,
                descricao = "Excedeu o limite de velocidade em 20 km/h",
                veiculoid = 1
            };

            var exception = Assert.Throws<ValidationException>(() => ValidateModel(multa));
            Assert.Contains("dtmulta", exception.Message);
        }

        [Fact]
        public void CriarMulta_SeDadosValidos_DeveCriarMulta()
        {
            var multa = new Multa
            {
                idviagem = 1,
                codigo = "A12345",
                dtmulta = DateTime.Now,
                tpinfracao = "Excesso de velocidade",
                valor = 200.0m,
                ptscarteira = 5,
                descricao = "Excedeu o limite de velocidade em 20 km/h",
                veiculoid = 1
            };

            ValidateModel(multa);
            Assert.Equal(1, multa.idviagem);
            Assert.Equal("A12345", multa.codigo);
            Assert.Equal("Excesso de velocidade", multa.tpinfracao);
            Assert.Equal(200.0m, multa.valor);
            Assert.Equal(5, multa.ptscarteira);
            Assert.Equal("Excedeu o limite de velocidade em 20 km/h", multa.descricao);
            Assert.Equal(1, multa.veiculoid);
        }

        private void ValidateModel(Multa multa)
        {
            var context = new ValidationContext(multa, null, null);
            Validator.ValidateObject(multa, context, true);
        }
    }
}
