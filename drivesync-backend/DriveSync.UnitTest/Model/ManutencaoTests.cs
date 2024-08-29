using System;
using System.ComponentModel.DataAnnotations;
using Xunit;

namespace DriveSync.Model.Tests
{
    public class ManutencaoTests
    {
        [Fact]
        public void CriarManutencao_SeDtManutencaoInvalida_DeveLancarValidationException()
        {
            var manutencao = new Manutencao
            {
                dt_manutencao = null,
                dt_prox_manutencao = DateTime.Now.AddMonths(6),
                tp_manutencao = "Preventiva",
                veiculo = "Toyota Corolla",
                servico = "Troca de óleo",
                valor = 150.0f,
                descricao = "Troca de óleo e filtro",
                veiculoId = 1
            };

            var exception = Assert.Throws<ValidationException>(() => ValidateModel(manutencao));
            Assert.Contains("dt_manutencao", exception.Message);
        }

        [Fact]
        public void CriarManutencao_SeDtProxManutencaoInvalida_DeveLancarValidationException()
        {
            var manutencao = new Manutencao
            {
                dt_manutencao = DateTime.Now,
                dt_prox_manutencao = null,
                tp_manutencao = "Preventiva",
                veiculo = "Toyota Corolla",
                servico = "Troca de óleo",
                valor = 150.0f,
                descricao = "Troca de óleo e filtro",
                veiculoId = 1
            };

            var exception = Assert.Throws<ValidationException>(() => ValidateModel(manutencao));
            Assert.Contains("dt_prox_manutencao", exception.Message);
        }

        [Fact]
        public void CriarManutencao_SeDadosValidos_DeveCriarManutencao()
        {
            var manutencao = new Manutencao
            {
                dt_manutencao = DateTime.Now,
                dt_prox_manutencao = DateTime.Now.AddMonths(6),
                tp_manutencao = "Preventiva",
                veiculo = "Toyota Corolla",
                servico = "Troca de óleo",
                valor = 150.0f,
                descricao = "Troca de óleo e filtro",
                veiculoId = 1
            };

            ValidateModel(manutencao);
            Assert.Equal("Preventiva", manutencao.tp_manutencao);
            Assert.Equal("Toyota Corolla", manutencao.veiculo);
            Assert.Equal("Troca de óleo", manutencao.servico);
            Assert.Equal(150.0f, manutencao.valor);
            Assert.Equal("Troca de óleo e filtro", manutencao.descricao);
            Assert.Equal(1, manutencao.veiculoId);
        }

        private void ValidateModel(Manutencao manutencao)
        {
            var context = new ValidationContext(manutencao, null, null);
            Validator.ValidateObject(manutencao, context, true);
        }
    }
}
