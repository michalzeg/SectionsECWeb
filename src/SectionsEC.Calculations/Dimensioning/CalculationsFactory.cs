using SectionsEC.Calculations.Interfaces;
using SectionsEC.Calculations.StressFunctions;
using SectionsEC.Calculations.Extensions;
using SectionsEC.Calculations.Sections;
using SectionsEC.Calculations.CompressionZone;
using StruCal.SectionsEC.Calculations.Interfaces;
using StruCal.SectionsEC.Calculations.Materials;

namespace SectionsEC.Calculations.Dimensioning
{
    public class CalculationsFactory : ICalculationsFactory
    {
        public IStrainCalculations GetStrainCalculations(Concrete concrete, Steel steel, SectionGeometry section) =>
            new StrainCalculations(concrete, steel, section);

        public ICompressionZoneCalculations GetCompressionZoneCalculations(Concrete concrete, IStrainCalculations strainCalculations)
        {
            if (concrete.N.IsApproximatelyEqualTo(2d))
                return new CompressionZoneCalculationsGreenFormula(concrete, strainCalculations);
            else
                return new CompressionZoneCalculationsNumericalFormula(concrete, strainCalculations);
        }
    }
}