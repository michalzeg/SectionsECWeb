using SectionsEC.Calculations.Interfaces;
using SectionsEC.Calculations.Results;
using SectionsEC.Calculations.Sections;
using SectionsEC.Calculations.Slicings;
using System;

namespace SectionsEC.Calculations.Integrations
{
    public class NumbericalIntegrationCalculator : IIntegration
    {
        private const int _numberOfSlices = 1000;

        public CompressionZoneResult Integrate(SectionGeometry section, double integrationPoint, Func<double, double> distributionFunction)
        {
            var slicing = new SlicingCalculator();
            var deltaY = section.H / _numberOfSlices;
            var currentY = section.MinY;
            var resultantMoment = 0d;
            var resultantNormalForce = 0d;
            while (currentY <= section.MaxY)
            {
                var slice = slicing.GetSlice(section.Coordinates, currentY + deltaY, currentY);
                currentY += deltaY;
                var value = distributionFunction(slice.CentreOfGravityY);
                var normalForce = value * slice.Area;
                var leverArm = Math.Abs(integrationPoint - slice.CentreOfGravityY);
                var moment = leverArm * value * slice.Area;
                resultantMoment += moment;
                resultantNormalForce += normalForce;
            }
            var result = new CompressionZoneResult
            {
                NormalForce = resultantNormalForce,
                Moment = resultantMoment
            };
            return result;
        }
    }
}