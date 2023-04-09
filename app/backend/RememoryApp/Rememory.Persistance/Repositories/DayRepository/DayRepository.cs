using MongoDB.Bson;
using MongoDB.Driver;
using Rememory.Persistance.Client;
using Rememory.Persistance.Entities;
using Rememory.Persistance.Repositories.Base;
using Rememory.Persistance.Repositories.JourneyRepository;

namespace Rememory.Persistance.Repositories.DayRepository;

public class DayRepository : BaseRepository<Day>, IDayRepository
{
    private const string CollectionName = "days";

    public DayRepository(IDatabaseClient databaseClient) : base(databaseClient, CollectionName)
    {
    }

    public Task<List<Day>> GetByJourneyAsync(Guid journeyId)
        => MongoCollection.Find(day => day.JourneyId == journeyId).ToListAsync();

    public Task AddVisitedPlaces(Guid dayId, IEnumerable<string> visited)
    {
        var push = Builders<Day>.Update.PushEach(d => d.VisitedPlaces, visited);
        return MongoCollection.UpdateOneAsync(d => d.Id == dayId, push);
    }
}