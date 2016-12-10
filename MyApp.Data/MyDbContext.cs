using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyApp.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext() { }
        public MyDbContext(string nameOrConnectionString) : base(nameOrConnectionString) { }

        public DbSet<Thing> Things { get; set; }
        public DbSet<Widget> Widgets { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Entity<Thing>().Property(t => t.Name).IsRequired().HasMaxLength(256);
            modelBuilder.Entity<Widget>().Property(w => w.Name).IsRequired().HasMaxLength(256);
        }
    }
}
