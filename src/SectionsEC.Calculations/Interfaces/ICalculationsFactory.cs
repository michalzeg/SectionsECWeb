using SectionsEC.Calculations.Interfaces;
using SectionsEC.Calculations.Sections;
using StruCal.SectionsEC.Calculations.Materials;

namespace StruCal.SectionsEC.Calculations.Interfaces
{
    public interface ICalculationsFactory
    {
        ICompressionZoneCalculations GetCompressionZoneCalculations(Concrete concrete, IStrainCalculations strainCalculations);
        IStrainCalculations GetStrainCalculations(Concrete concrete, Steel steel, SectionGeometry section);
    }
}