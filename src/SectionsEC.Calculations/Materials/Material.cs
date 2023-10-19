using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.SectionsEC.Calculations.Materials
{
    public record Material
    {
        public Concrete[] Concrete { get; init; }
        public Steel[] Steel { get; init; }
    }
}
