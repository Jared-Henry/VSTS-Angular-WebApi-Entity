using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyApp.Data
{
    public class MyDbContextFactory : IDbContextFactory<MyDbContext>
    {
        public MyDbContextFactory() { }
        public MyDbContextFactory(string nameOrConnectionString)
        {
            this.NameOrConnectionString = nameOrConnectionString;
        }

        public string NameOrConnectionString { get; set; }

        public MyDbContext Create()
        {
            if (string.IsNullOrEmpty(this.NameOrConnectionString))
                return new MyDbContext();
            else
                return new MyDbContext(this.NameOrConnectionString);
        }
    }
}
