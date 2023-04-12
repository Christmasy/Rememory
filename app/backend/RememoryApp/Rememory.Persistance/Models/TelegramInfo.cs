using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Rememory.Persistance.Models;

public class TelegramInfo
{
    public string? TelegramId { get; set; }

    [JsonConverter(typeof(StringEnumConverter))]
    [BsonRepresentation(BsonType.String)]
    public TelegramState TelegramState { get; set; }
    
    /// <summary>
    /// A GUID representing the ID of the object (journey, day, etc.)
    /// the user is currently interacting with, if applicable.
    /// </summary>
    public Guid ObjectId { get; set; }
}