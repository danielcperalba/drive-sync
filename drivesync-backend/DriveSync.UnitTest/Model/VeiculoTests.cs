using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Xunit;

namespace DriveSync.Model.Tests
{
    public class VeiculoTests
    {
        [Fact]
        public void CriarVeiculo_SePlacaInvalida_DeveLancarValidationException()
        {
            // Arrange
            var veiculo = new Veiculo
            {
                placa = "R@K1235",
                marca = "Toyota",
                modelo = "Corolla",
                ano = 2020,
                quilometragem = 10000,
                tp_combustivel = "Gasolina",
                dt_aquisicao = DateTime.Now,
                cor = "Branco"
            };

            // Act & Assert
            var exception = Assert.Throws<ValidationException>(() => ValidateModel(veiculo));
            Assert.Contains("placa", exception.Message);
        }

        [Fact]
        public void CriarVeiculo_SeAnoInvalido_DeveLancarValidationException()
        {
            // Arrange
            var veiculo = new Veiculo
            {
                placa = "ABC1234",
                marca = "Toyota",
                modelo = "Corolla",
                ano = 2030,
                quilometragem = 10000,
                tp_combustivel = "Gasolina",
                dt_aquisicao = DateTime.Now,
                cor = "Branco"
            };

            // Act & Assert
            var exception = Assert.Throws<ValidationException>(() => ValidateModel(veiculo));
            Assert.Contains("ano", exception.Message);
        }

        [Fact]
        public void CriarVeiculo_SeDadosValidos_DeveCriarVeiculo()
        {
            // Arrange
            var veiculo = new Veiculo
            {
                placa = "ABC1234",
                marca = "Toyota",
                modelo = "Corolla",
                ano = 2020,
                quilometragem = 10000,
                tp_combustivel = "Gasolina",
                dt_aquisicao = DateTime.Now,
                status = "Ativo",
                cap_passageiros = "5",
                categoria = "Sedan",
                nmr_chassi = "123456789012",
                renavam = "12345678901",
                cor = "Branco"
            };

            // Act & Assert
            ValidateModel(veiculo);
            Assert.Equal("ABC1234", veiculo.placa);
            Assert.Equal("Toyota", veiculo.marca);
            Assert.Equal("Corolla", veiculo.modelo);
            Assert.Equal(2020, veiculo.ano);
            Assert.Equal(10000, veiculo.quilometragem);
            Assert.Equal("Gasolina", veiculo.tp_combustivel);
            Assert.Equal(DateTime.Now.Date, veiculo.dt_aquisicao.Value.Date);
            Assert.Equal("Ativo", veiculo.status);
            Assert.Equal("5", veiculo.cap_passageiros);
            Assert.Equal("Sedan", veiculo.categoria);
            Assert.Equal("123456789012", veiculo.nmr_chassi);
            Assert.Equal("12345678901", veiculo.renavam);
            Assert.Equal("Branco", veiculo.cor);
        }

        [Fact]
        public void CriarVeiculo_SeQuilometragemInvalida_DeveLancarValidationException()
        {
            // Arrange
            var veiculo = new Veiculo
            {
                placa = "ABC1234",
                marca = "Toyota",
                modelo = "Corolla",
                ano = 2020,
                quilometragem = null,
                tp_combustivel = "Gasolina",
                dt_aquisicao = DateTime.Now,
                cor = "Branco"
            };

            // Act & Assert
            var exception = Assert.Throws<ValidationException>(() => ValidateModel(veiculo));
            Assert.Contains("quilometragem", exception.Message);
        }

        [Fact]
        public void CriarVeiculo_SeTpCombustivelInvalido_DeveLancarValidationException()
        {
            // Arrange
            var veiculo = new Veiculo
            {
                placa = "ABC1234",
                marca = "Toyota",
                modelo = "Corolla",
                ano = 2020,
                quilometragem = 10000,
                tp_combustivel = null,
                dt_aquisicao = DateTime.Now,
                cor = "Branco"
            };

            // Act & Assert
            var exception = Assert.Throws<ValidationException>(() => ValidateModel(veiculo));
            Assert.Contains("tp_combustivel", exception.Message);
        }

        private void ValidateModel(Veiculo veiculo)
        {
            var context = new ValidationContext(veiculo, null, null);
            Validator.ValidateObject(veiculo, context, true);
        }
    }
}
