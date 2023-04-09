using Rememory.Persistance.Entities;
using Rememory.Persistance.Repositories.Base;

namespace Rememory.Persistance.Repositories.DayRepository;

public interface IDayRepository : IRepository<Day>
{
    public Task<List<Day>> GetByJourneyAsync(Guid journeyId);
    public Task AddVisitedPlacesAsync(Guid dayId, IEnumerable<string> visited);
}