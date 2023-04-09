using MongoDB.Driver;
using Rememory.Persistance.Client;
using Rememory.Persistance.Entities;
using Rememory.Persistance.Repositories.Base;

namespace Rememory.Persistance.Repositories.JourneyRepository;

public class JourneyRepository : BaseRepository<Journey>, IJourneyRepository
{
    private const string CollectionName = "journeys";

    public JourneyRepository(IDatabaseClient databaseClient) : base(databaseClient, CollectionName)
    {
    }

    public Task<List<Journey>> GetByUserAsync(Guid userId)
        => MongoCollection.Find(journey => journey.UserId == userId).ToListAsync();
}