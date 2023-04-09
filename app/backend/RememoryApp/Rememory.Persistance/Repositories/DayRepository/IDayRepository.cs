using Rememory.Persistance.Entities;
using Rememory.Persistance.Repositories.Base;

namespace Rememory.Persistance.Repositories.JourneyRepository;

public interface IDayRepository : IRepository<Day>
{
    public Task<List<Day>> GetByJourneyAsync(Guid journeyId);
    public Task AddVisitedPlaces(Guid dayId, IEnumerable<string> visited);
}