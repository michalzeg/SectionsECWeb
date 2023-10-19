using System;
using SectionsEC.Calculations.Integrations;
using SectionsEC.Calculations.Interfaces;
using SectionsEC.Calculations.Results;
using SectionsEC.Calculations.Sections;
using SectionsEC.Calculations.StressFunctions;
using StruCal.SectionsEC.Calculations.Materials;

namespace SectionsEC.Calculations.CompressionZone
{
    public class CompressionZoneCalculationsNumericalFormula : ICompressionZoneCalculations
    {
        private readonly IStrainCalculations _strainCalculations;
        private readonly Concrete _concrete;
        private readonly NumbericalIntegrationCalculator _integrationCalculator;
        public CompressionZoneCalculationsNumericalFormula(Concrete concrete, IStrainCalculations strainCalculations)
        {
            _strainCalculations = strainCalculations;
            _concrete = concrete;
            _integrationCalculator = new NumbericalIntegrationCalculator();
        }

        public CompressionZoneResult Calculate(double x, SectionGeometry section, double effectiveDepth)
        {
            var compressionZone = CompressionZoneCoordinates.CoordinatesOfCompressionZone(section.Coordinates, section.MaxY - x);

            double distance(double y) => section.MaxY - y;
            double strain(double di) => _strainCalculations.StrainInConcrete(x, distance(di), effectiveDepth);
            double stress(double e) => _concrete.ConcreteStressDesign(strain(e));

            var result = _integrationCalculator.Integrate(compressionZone, section.MinY, stress);
            return result;
        }
    }
}