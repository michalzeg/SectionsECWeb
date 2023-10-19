using System;
using System.Collections.Generic;
using System.Text;
using SectionsEC.Calculations.Dimensioning;
using SectionsEC.Calculations.Geometry;
using SectionsEC.Calculations.LoadCases;
using SectionsEC.Calculations.Results;
using SectionsEC.Calculations.Sections;
using StruCal.SectionsEC.Calculations.Materials;

namespace StruCal.SectionsEC.Calculations
{
    public static class CapacityCalculatorFacade
    {
        public static IReadOnlyCollection<CalculationResults> GetSectionCapacity(Concrete concrete, Steel steel, IList<PointD> sectionCoordinates, IList<Bar> bars, IList<LoadCase> loadCases)
        {
            var capacity = new SectionCapacity(new CalculationsFactory());
            var sectionGeometry = new SectionGeometry(sectionCoordinates);
            var section = new Section(concrete, steel, sectionGeometry, bars);
            var results = CalculateCapacity(loadCases, capacity, section);
            return results;
        }

        private static IReadOnlyCollection<CalculationResults> CalculateCapacity(IList<LoadCase> loadCases, SectionCapacity capacity, Section section)
        {
            var results = new List<CalculationResults>();
            for (int i = 0; i <= loadCases.Count - 1; i++)
            {
                var loadCase = loadCases[i];
                var result = capacity.CalculateCapacity(loadCase, section);
                results.Add(result);
            }

            return results;
        }
    }
}