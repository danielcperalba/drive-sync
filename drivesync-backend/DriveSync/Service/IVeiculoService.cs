using DriveSync.Model;

namespace DriveSync.Service
{
    public interface IVeiculoService
    {
        Task<IEnumerable<Veiculo>> GetVeiculos();
        Task<Veiculo> GetVeiculo(int id);
        Task<IEnumerable<Veiculo>> GetVeiculosByPlaca(string placa);
        Task<IEnumerable<Veiculo>> GetVeiculosByEmpresaId(int empresaId);
        Task<IEnumerable<Veiculo>> GetVeiculosByPlacaAndEmpresaId(string placa, int empresId);
        Task CreateVeiculo(Veiculo veiculo);
        Task UpdateVeiculo(Veiculo veiculo);
        Task DeleteVeiculo(Veiculo veiculo);
    }
}
