using SectionsEC.Calculations.Results;
using SectionsEC.Calculations.Sections;
using System;

namespace SectionsEC.Calculations.Interfaces
{
    public interface IIntegration
    {
        CompressionZoneResult Integrate(SectionGeometry section, double integrationPoint, Func<double, double> distributionFunction);
    }
}