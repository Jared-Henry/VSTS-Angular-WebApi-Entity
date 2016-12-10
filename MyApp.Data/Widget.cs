using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyApp.Data
{
    public class Widget
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int ThingId { get; set; }
        public Thing Thing { get; set; }
    }
}
