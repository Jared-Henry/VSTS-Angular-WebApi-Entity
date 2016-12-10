using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyApp.Data
{
    public class Thing
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Widget> Widgets { get; set; }
    }
}
