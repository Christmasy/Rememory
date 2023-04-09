using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Rememory.Persistance.Models;

namespace Rememory.Persistance.Entities;

public class User : IDatabaseEntity
{
    [BsonId]
    public Guid Id { get; set; }
    public Guid TelegramId { get; set; }
    
    [JsonConverter(typeof(StringEnumConverter))]
    [BsonRepresentation(BsonType.String)]
    public TelegramState TelegramState { get; set; }
}