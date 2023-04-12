using MongoDB.Bson.Serialization.Attributes;
using Rememory.Persistance.Models;

namespace Rememory.Persistance.Entities;

public class User : IDatabaseEntity
{
    [BsonId]
    public Guid Id { get; set; }
    public TelegramInfo? TelegramInfo { get; set; }
}