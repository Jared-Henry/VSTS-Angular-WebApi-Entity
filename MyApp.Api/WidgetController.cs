using MyApp.Data;
using System.Data.Entity.Infrastructure;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace MyApp.Api
{
    [RoutePrefix("api/widgets")]
    public class WidgetController : BaseController<MyDbContext>
    {
        public WidgetController(IDbContextFactory<MyDbContext> dbContextFactory) : base(dbContextFactory) { }        

        [HttpGet, Route("{id}")]
        public Task<WidgetDto> Get(CancellationToken cancellationToken, int id)
        {
            return GetSingleOrDefault<Widget, WidgetDto>(cancellationToken, w => w.Id == id);
        }

        [HttpGet, Route]
        public Task<WidgetDto[]> GetAll(CancellationToken cancellationToken)
        {
            return GetArray<Widget, WidgetDto>(cancellationToken);
        }

        [HttpPost, Route]
        public Task<int> Insert(CancellationToken cancellationToken, WidgetDto dto)
        {
            return Insert<Widget>(cancellationToken, dto);
        }

        [HttpPut, Route("{id}")]
        public Task Update(CancellationToken cancellationToken, int id, WidgetDto dto)
        {
            return Update<Widget>(cancellationToken, id, dto);
        }

        [HttpDelete, Route("{id}")]
        public Task Delete(CancellationToken cancellationToken, int id)
        {
            return Delete<Widget>(cancellationToken, id);
        }
    }
}
