using System;
using System.Linq;
using SectionsEC.Calculations.Interfaces;
using SectionsEC.Calculations.Results;
using SectionsEC.Calculations.LoadCases;
using SectionsEC.Calculations.CompressionZone;
using StruCal.SectionsEC.Calculations.Interfaces;

namespace SectionsEC.Calculations.Dimensioning
{

    public class SectionCapacity
    {
        private const double Error = 0.00000000001;
        private const int MaxIterationsNumber = 10000;
        private const double MinFactor = 0.000001;
        private const int MaxFactor = 10;
        private readonly ICalculationsFactory _calculationsFactory;

        private ICompressionZoneCalculations _compressionZoneCalculations;
        private IStrainCalculations _strainCalculations;

        public SectionCapacity(ICalculationsFactory calculationsFactory)
        {
            _calculationsFactory = calculationsFactory;
        }

        public CalculationResults CalculateCapacity(LoadCase loadCase, Section section)
        {
            _strainCalculations = _calculationsFactory.GetStrainCalculations(section.Concrete, section.Steel, section.SectionGeometry);
            _compressionZoneCalculations = _calculationsFactory.GetCompressionZoneCalculations(section.Concrete, _strainCalculations);

            var resultX = SolveEqulibriumEquation(loadCase.NormalForce, section);
            var forcesCompressionZone = _compressionZoneCalculations.Calculate(resultX, section.SectionGeometry, section.EffectiveDepth);

            var compresionZone = CompressionZoneCoordinates.CoordinatesOfCompressionZone(section.SectionGeometry.Coordinates, section.SectionGeometry.GetNeutralAxis(resultX));

            var result = new CalculationResults
            {
                D = section.EffectiveDepth,
                X = resultX,
                MrdConcrete = forcesCompressionZone.Moment,
                ForceConcrete = forcesCompressionZone.NormalForce,
                Mrd = section.MomentReinforcement() + forcesCompressionZone.Moment - loadCase.NormalForce * section.SectionGeometry.LeverArm,
                CompressionZone = compresionZone.Coordinates,
                Reinforcements = section.Reinforcement.ToList(),
                Ec = _strainCalculations.StrainInConcrete(resultX, 0, section.EffectiveDepth),
                H = section.SectionGeometry.H,
                Cz = section.SectionGeometry.Cz,
                ForceReinforcement = section.Reinforcement.Sum(e => e.Force),
                MomentReinforcement = section.Reinforcement.Sum(e => e.Moment),
                LoadCase = loadCase,
                CompressionAxialCapacity = section.CompressionCapacity(),
                TensionAxialCapacity = section.TensionCapacity(),
                Steel = section.Steel,
                Concrete = section.Concrete
            };
            return result;
        }


        private double EqulibriumEquation(double x, double axialForce, Section section)
        {
            var forceInConcrete = section.ForceInConcrete(x, _compressionZoneCalculations);
            var forceInAs1 = section.ForceInTensionSteel(x, _strainCalculations);
            var forceInAs2 = section.ForceInCompressedSteel(x, _strainCalculations);
            var result = forceInConcrete + forceInAs2 - forceInAs1 - axialForce;
            return result;
        }


        private double SolveEqulibriumEquation(double axialForce, Section section)
        {
            var xLeft = MinFactor * section.SectionGeometry.H;
            var xRight = MaxFactor * section.SectionGeometry.H;
            var currentIteration = 0;
            while (Math.Abs(xLeft - xRight) > Error && currentIteration < MaxIterationsNumber)
            {
                currentIteration++;
                var xMedium = (xRight + xLeft) / 2;
                var fL = EqulibriumEquation(xLeft, axialForce, section);
                var fR = EqulibriumEquation(xRight, axialForce, section);
                var fM = EqulibriumEquation(xMedium, axialForce, section);
                if (fL * fM < 0)
                {
                    xRight = xMedium;
                }
                if (fR * fM < 0)
                {
                    xLeft = xMedium;
                }
            }
            var result = currentIteration > 1000 ? double.NaN : (xRight + xLeft) / 2;
            return result;
        }
    }
}