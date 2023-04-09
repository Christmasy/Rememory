using Rememory.Persistance.Entities;
using Rememory.Persistance.Repositories.Base;

namespace Rememory.Persistance.Repositories.JourneyRepository;

public interface IJourneyRepository : IRepository<Journey>
{
    public Task<List<Journey>> GetByUserAsync(Guid userId);
}