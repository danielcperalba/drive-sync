using DriveSync.Model;
using DriveSync.Service;
using Microsoft.AspNetCore.Mvc;

namespace DriveSync.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViagensController : ControllerBase
    {
        private readonly ViagemService _viagemService;

        public ViagensController(ViagemService viagemService) => _viagemService = viagemService;

        [HttpGet]
        public async Task<List<Viagem>> Get() => await _viagemService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Viagem>> Get(string id)
        {
            var Viagem = await _viagemService.GetAsync(id);

            if (Viagem == null)
            {
                return NotFound();
            }

            return Viagem;
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Viagem viagemAtualizada)
        {
            var Viagem = await _viagemService.GetAsync(id);

            if(Viagem == null)
            {
                return NotFound();
            }

            viagemAtualizada.Id = Viagem.Id;

            await _viagemService.UpdateAsync(id, viagemAtualizada);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var Viagem = await _viagemService.GetAsync(id);

            if(Viagem is null)
            {
                return NoContent();
            }

            await _viagemService.RemoveAsync(id);

            return NoContent();
        }
    }
}
