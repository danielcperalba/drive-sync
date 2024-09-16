﻿using DriveSync.Model;
using DriveSync.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DriveSync.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class VeiculosController : ControllerBase
    {
        private readonly ILogger<VeiculosController> _logger;

        private IVeiculoService _veiculoService;

        public VeiculosController(IVeiculoService veiculoService)
        {
            _veiculoService = veiculoService;
        }

        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<Veiculo>>> GetVeiculos()
        {
            try
            {
                var empresaId = User.Claims.FirstOrDefault(c => c.Type == "EmpresaId")?.Value;

                if(string.IsNullOrEmpty(empresaId))
                {
                    return Unauthorized("Usuário não pertence a nenhuma empresa.");
                }

                var veiculos = await _veiculoService.GetVeiculosByEmpresaId(int.Parse(empresaId));
                return Ok(veiculos);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Erro ao obter veiculos");
            }
        }

        [HttpGet("VeiculoPorPlaca")]
        public async Task<ActionResult<IAsyncEnumerable<Veiculo>>> GetVeiculosByPlaca([FromQuery] string placa)
        {
            try
            {
                var empresaId = User.Claims.FirstOrDefault(c => c.Type == "EmpresaId")?.Value;

                if(string.IsNullOrEmpty(empresaId))
                {
                    return Unauthorized("Usuário não pertence a nenhuma empresa.");
                }

                var veiculos = await _veiculoService.GetVeiculosByPlacaAndEmpresaId(placa, int.Parse(empresaId));
                if (veiculos.Count() == 0)
                {
                    return NotFound($"Não existem veiculos com o critério {placa}");

                }
                return Ok(veiculos);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Erro ao obter veiculo");
            }
        }

        [HttpGet("{id:int}", Name = "GetVeiculo")]
        public async Task<ActionResult<IAsyncEnumerable<Veiculo>>> GetVeiculo(int id)
        {
            try
            {
                var veiculo = await _veiculoService.GetVeiculo(id);

                if (veiculo == null)
                {
                    return NotFound($"Não existe um veículo com o id={id}");
                }
                return Ok(veiculo);
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(Veiculo veiculo)
        {
            try
            {
                var empresaIdClaim = User.Claims.FirstOrDefault(c => c.Type == "EmpresaId")?.Value;

                // Adicione um log para verificar a claim
                Console.WriteLine($"EmpresaId na claim: {empresaIdClaim}");

                if (string.IsNullOrEmpty(empresaIdClaim))
                {
                    return Unauthorized("Usuário não pertence a nenhuma empresa.");
                }

                // Converta a claim para int
                var empresaId = int.Parse(empresaIdClaim);

                veiculo.EmpresaId = empresaId;

                await _veiculoService.CreateVeiculo(veiculo);
                return CreatedAtRoute(nameof(GetVeiculo), new { Id = veiculo.Id }, veiculo);
            }
            catch (Exception ex)
            {
                // Logue o erro
                Console.WriteLine($"Erro: {ex.Message}");
                return BadRequest("Request inválido");
            }
        }


        [HttpPut("{id:int}")]
        public async Task<ActionResult> Edit(int id, [FromBody] Veiculo veiculo)
        {
            try
            {
               if(veiculo.Id == id)
                {
                    await _veiculoService.UpdateVeiculo(veiculo);
                    return Ok($"Veiculo com id={id} foi atualizado com sucesso");
                }
               return BadRequest("Dados inconsistentes");
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete (int id)
        {
            try
            {
                var veiculo = await _veiculoService.GetVeiculo(id);
                if(veiculo != null)
                {
                    await _veiculoService.DeleteVeiculo(veiculo);
                    return Ok($"Veiculo de id={id} foi excluido com sucesso");
                }
                return NotFound($"Veiculo com id={id} não encontrado");
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

    }
}
