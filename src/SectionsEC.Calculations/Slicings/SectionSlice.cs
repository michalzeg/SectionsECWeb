using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SectionsEC.Calculations.Slicings
{
    public readonly record struct SectionSlice
    {
        public double CentreOfGravityY { get; init; }
        public double Area { get; init; }
    }
}