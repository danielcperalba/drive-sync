using System;
using System.ComponentModel.DataAnnotations;
using Xunit;

namespace DriveSync.Model.Tests
{
    public class EmpresaTests
    {
        [Fact]
        public void CriarEmpresa_SeNomeInvalido_DeveLancarValidationException()
        {
            var empresa = new Empresa
            {
                nome = null,
                cnpj = "12345678000195",
                endereco = "Rua Exemplo, 123",
                email = "empresa@exemplo.com",
                telefone = "1234567890",
                data_cadastro = DateTime.Now
            };

            var exception = Assert.Throws<ValidationException>(() => ValidateModel(empresa));
            Assert.Contains("nome", exception.Message);
        }

        [Fact]
        public void CriarEmpresa_SeCnpjInvalido_DeveLancarValidationException()
        {
            var empresa = new Empresa
            {
                nome = "Empresa Exemplo",
                cnpj = "123",
                endereco = "Rua Exemplo, 123",
                email = "empresa@exemplo.com",
                telefone = "1234567890",
                data_cadastro = DateTime.Now
            };

            var exception = Assert.Throws<ValidationException>(() => ValidateModel(empresa));
            Assert.Contains("cnpj", exception.Message);
        }

        [Fact]
        public void CriarEmpresa_SeEmailInvalido_DeveLancarValidationException()
        {
            var empresa = new Empresa
            {
                nome = "Empresa Exemplo",
                cnpj = "12345678000195",
                endereco = "Rua Exemplo, 123",
                email = "email_invalido",
                telefone = "1234567890",
                data_cadastro = DateTime.Now
            };

            var exception = Assert.Throws<ValidationException>(() => ValidateModel(empresa));
            Assert.Contains("email", exception.Message);
        }

        [Fact]
        public void CriarEmpresa_SeDadosValidos_DeveCriarEmpresa()
        {
            var empresa = new Empresa
            {
                nome = "Empresa Exemplo",
                cnpj = "12345678000195",
                endereco = "Rua Exemplo, 123",
                email = "empresa@exemplo.com",
                telefone = "1234567890",
                data_cadastro = DateTime.Now
            };

            ValidateModel(empresa);
            Assert.Equal("Empresa Exemplo", empresa.nome);
            Assert.Equal("12345678000195", empresa.cnpj);
            Assert.Equal("Rua Exemplo, 123", empresa.endereco);
            Assert.Equal("empresa@exemplo.com", empresa.email);
            Assert.Equal("1234567890", empresa.telefone);
            Assert.Equal(DateTime.Now.Date, empresa.data_cadastro.Value.Date);
        }

        private void ValidateModel(Empresa empresa)
        {
            var context = new ValidationContext(empresa, null, null);
            Validator.ValidateObject(empresa, context, true);
        }
    }
}
