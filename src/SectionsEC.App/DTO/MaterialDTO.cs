using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.SectionsEC.App.DTO
{

    public record MaterialDTO
    {
        public ConcreteDTO[] Concrete { get; init; }
        public SteelDTO[] Steel { get; init; }
    }
}
