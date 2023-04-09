using MongoDB.Bson.Serialization.Attributes;

namespace Rememory.Persistance.Entities;

public class Day : IDatabaseEntity
{
    [BsonId]
    public Guid Id { get; set; }
    public Guid JourneyId { get; set; }
    public DateTime Date { get; set; }
    [BsonIgnoreIfNull]
    public List<string>? VisitedPlaces { get; set; }
    public string? Description { get; set; }
}