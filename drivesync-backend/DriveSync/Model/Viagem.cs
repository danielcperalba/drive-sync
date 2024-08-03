using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DriveSync.Model
{
    public class Viagem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
    }
}
