using MyApp.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.Infrastructure;
using System.Web.Http;
using System.Threading;
using AutoMapper.QueryableExtensions;
using System.Data.Entity;
using AutoMapper;

namespace MyApp.Api
{
    [RoutePrefix("api/things")]
    public class ThingController : BaseController<MyDbContext>
    {
        public ThingController(IDbContextFactory<MyDbContext> dbContextFactory) : base(dbContextFactory) { }        

        [HttpGet, Route("{id}")]
        public Task<ThingDto> Get(CancellationToken cancellationToken, int id)
        {
            return GetSingleOrDefault<Thing, ThingDto>(cancellationToken, t => t.Id == id);
        }

        [HttpGet, Route]
        public Task<ThingDto[]> GetAll(CancellationToken cancellationToken)
        {
            return GetArray<Thing, ThingDto>(cancellationToken);
        }

        [HttpPost, Route]
        public Task<int> Insert(CancellationToken cancellationToken, [FromBody]ThingDto dto)
        {
            return Insert<Thing>(cancellationToken, dto);
        }

        [HttpPut, Route("{id}")]
        public Task Update(CancellationToken cancellationToken, int id, ThingDto dto)
        {
            return Update<Thing>(cancellationToken, id, dto);
        }

        [HttpDelete, Route("{id}")]
        public Task Delete(CancellationToken cancellationToken, int id)
        {
            return Delete<Thing>(cancellationToken, id);
        }
    }
}
