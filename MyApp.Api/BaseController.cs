using AutoMapper;
using AutoMapper.QueryableExtensions;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace MyApp.Api
{
    public class BaseController<TDbContext> : ApiController where TDbContext : DbContext
    {
        public BaseController(IDbContextFactory<TDbContext> dbContextFactory)
        {
            this.DbContextFactory = dbContextFactory;
        }

        protected virtual IDbContextFactory<TDbContext> DbContextFactory { get; set; }

        protected virtual TDbContext CreateDbContext()
        {
            return this.DbContextFactory.Create();
        }

        protected virtual async Task<TResult> FromDb<TResult>(Func<TDbContext, Task<TResult>> work)
        {
            using (var db = CreateDbContext())
                return await work(db);
        }

        protected virtual async Task UsingDb(Func<TDbContext, Task> work)
        {
            using (var db = CreateDbContext())
                await work(db);
        }

        protected virtual Task<TDto> GetSingleOrDefault<TEntity, TDto>(CancellationToken cancellationToken, Expression<Func<TEntity, bool>> predicate) where TEntity : class
        {
            return FromDb(db => db.Set<TEntity>().Where(predicate).ProjectTo<TDto>().SingleOrDefaultAsync(cancellationToken));
        }

        protected virtual Task<TDto[]> GetArray<TEntity, TDto>(CancellationToken cancellationToken, Expression<Func<TEntity, bool>> predicate = null) where TEntity : class
        {
            return FromDb(db =>
            {
                var query = (IQueryable<TEntity>)db.Set<TEntity>();
                if (predicate != null)
                    query = query.Where(predicate);
                return query.ProjectTo<TDto>().ToArrayAsync(cancellationToken);
            });
        }

        protected virtual async Task Delete<TEntity>(CancellationToken cancellationToken, object id) where TEntity : class
        {
            await UsingDb(async db =>
            {
                var entity = await db.Set<TEntity>().FindAsync(id, cancellationToken);
                db.Set<TEntity>().Remove(entity);
                await db.SaveChangesAsync(cancellationToken);
            });
        }

        protected virtual Task<int> Insert<TEntity>(CancellationToken cancellationToken, object dto) where TEntity : class
        {
            var idProperty = typeof(TEntity).GetProperty("Id");
            if (idProperty == null)
                throw new InvalidOperationException("Entity does not have an Id property.");
            if (idProperty.PropertyType != typeof(int))
                throw new InvalidOperationException("Entity Id property is not of type int.");
            return FromDb(async db =>
            {
                var entity = Mapper.Map<TEntity>(dto);
                db.Set<TEntity>().Add(entity);
                await db.SaveChangesAsync(cancellationToken);
                return (int)idProperty.GetValue(entity);
            });
        }

        protected virtual async Task Update<TEntity>(CancellationToken cancellationToken, object id, object dto) where TEntity : class
        {
            await UsingDb(async db =>
            {
                var entity = await db.Set<TEntity>().FindAsync(cancellationToken, id);
                Mapper.Map(dto, entity);
                await db.SaveChangesAsync(cancellationToken);
            });
        }
    }
}
