using DriveSync.Model;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace DriveSync.Service
{
    public class ViagemService
    {
        private readonly IMongoCollection<Viagem> _ViagemCollection;

        public ViagemService(
            IOptions<DatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
            _ViagemCollection = mongoDatabase.GetCollection<Viagem>("Viagem");
        }

        public async Task<List<Viagem>> GetAsync() =>
            await _ViagemCollection.Find(_  => true).ToListAsync();
        public async Task<Viagem?> GetAsync(string id) =>
            await _ViagemCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task CreateAsync(Viagem newViagem) =>
            await _ViagemCollection.InsertOneAsync(newViagem);
        public async Task UpdateAsync(string id, Viagem updateViagem) =>
            await _ViagemCollection.ReplaceOneAsync(x => x.Id == id, updateViagem);
        public async Task RemoveAsync(string id) => await _ViagemCollection.DeleteOneAsync(x => x.Id == id);
    }
}
