using System;
using System.Collections.Generic;
using SectionsEC.Calculations.Geometry;
using SectionsEC.Calculations.Interfaces;
using SectionsEC.Calculations.Results;
using SectionsEC.Calculations.Sections;
using StruCal.SectionsEC.Calculations.Materials;

namespace SectionsEC.Calculations.CompressionZone
{
    public class CompressionZoneCalculationsGreenFormula : ICompressionZoneCalculations
    {
        private readonly Concrete _concrete;
        private readonly IStrainCalculations _strainCalculations;


        public CompressionZoneCalculationsGreenFormula(Concrete concrete, IStrainCalculations strainCalculations)
        {
            _concrete = concrete;
            _strainCalculations = strainCalculations;
        }

        public CompressionZoneResult Calculate(double x, SectionGeometry section, double effectiveDepth)
        {
            var yNeutralAxis = section.GetNeutralAxis(x);
            var ec2Y = _strainCalculations.Ec2Y(x, effectiveDepth);
            var y2Promiles = yNeutralAxis + ec2Y;

            var compressionZone = CompressionZoneCoordinates.CoordinatesOfCompressionZone(section.Coordinates, yNeutralAxis);
            var parabolicZone = CompressionZoneCoordinates.CoordinatesOfParabolicSection(compressionZone.Coordinates, y2Promiles);
            var linearZone = CompressionZoneCoordinates.CoordinatesOfLinearSection(compressionZone.Coordinates, y2Promiles);

            var result = new CompressionZoneResult
            {
                NormalForce = CalculateResultantForce(linearZone, parabolicZone, yNeutralAxis, y2Promiles),
                Moment = CalculateResultantMoment(linearZone, parabolicZone, section, yNeutralAxis, y2Promiles)
            };
            return result;
        }

        private double CalculateResultantForce(SectionGeometry linearZone, SectionGeometry parabolicZone, double yNeutralAxis, double y2Promiles)
        {
            return ResultantOfLinearSection(linearZone.Coordinates) + ResultantOfParabolicSection(parabolicZone.Coordinates, y2Promiles, yNeutralAxis);
        }

        private double CalculateResultantMoment(SectionGeometry linearZone, SectionGeometry parabolicZone, SectionGeometry section, double yNeutralAxis, double y2Promiles)
        {
            var rLinear = 0d;
            if (y2Promiles < section.MaxY)
            {
                rLinear = FirstMomentOfAreaOfLinearSection(linearZone.Coordinates) / ResultantOfLinearSection(linearZone.Coordinates) - section.MinY;
            }
            var rParabolic = yNeutralAxis
                + FirstMomentOfAreaOfParabolicSection(parabolicZone.Coordinates, y2Promiles, yNeutralAxis)
                / ResultantOfParabolicSection(parabolicZone.Coordinates, y2Promiles, yNeutralAxis)
                - section.MinY;
            return ResultantOfLinearSection(linearZone.Coordinates) * rLinear + ResultantOfParabolicSection(parabolicZone.Coordinates, y2Promiles, yNeutralAxis) * rParabolic;
        }

        private double ResultantOfParabolicSection(IList<PointD> parabolicSection, double ec2Y, double neutralAxisY)
        {
            var ymax = ec2Y - neutralAxisY;
            var factorA = _concrete.Fcd * ymax / 3;
            var factorC = 1 / ymax;
            var factorV = 0.0;

            for (int i = 0; i <= parabolicSection.Count - 2; i++)
            {
                var dx = parabolicSection[i + 1].X - parabolicSection[i].X;
                var dy = parabolicSection[i + 1].Y - parabolicSection[i].Y;
                var xi = parabolicSection[i].X;
                var yi = parabolicSection[i].Y - neutralAxisY;
                factorV = factorV
                    + factorA * dx * (factorC * factorC * factorC * dy * dy * dy / 4
                    + Math.Pow(factorC * yi - 1, 3)
                    + factorC * factorC * dy * dy * (factorC * yi - 1)
                    + 0.5 * 3 * factorC * dy * (factorC * yi - 1) * (factorC * yi - 1))
                    + _concrete.Fcd * dy * (dx / 2 + xi);
            }
            return factorV;
        }

        private double FirstMomentOfAreaOfParabolicSection(IList<PointD> parabolicSection, double ec2Y, double neutralAxisY)
        {
            double ymax = ec2Y - neutralAxisY;
            double factorC = 1 / ymax;
            double factorS = 0d;

            for (int i = 0; i <= parabolicSection.Count - 2; i++)
            {
                var dx = parabolicSection[i + 1].X - parabolicSection[i].X;
                var dy = parabolicSection[i + 1].Y - parabolicSection[i].Y;
                var xi = parabolicSection[i].X;
                var yi = parabolicSection[i].Y - neutralAxisY;
                factorS = factorS
                    + _concrete.Fcd / (factorC * factorC)
                    * dx
                    * (factorC * factorC * factorC * factorC * dy * dy * dy * dy / 20
                    + factorC * factorC * factorC * factorC * dy * dy * dy * yi / 4
                    + factorC * factorC * factorC * factorC * dy * dy * yi * yi / 2
                    + factorC * factorC * factorC * factorC * dy * yi * yi * yi / 2
                    + factorC * factorC * factorC * factorC * yi * yi * yi * yi / 4
                    - factorC * factorC * factorC * dy * dy * dy / 6
                    - 2 * factorC * factorC * factorC * dy * dy * yi / 3
                    - factorC * factorC * factorC * dy * yi * yi
                    - 2 * factorC * factorC * factorC * yi * yi * yi / 3
                    + factorC * factorC * dy * dy / 6
                    + factorC * factorC * dy * yi / 2
                    + factorC * factorC * yi * yi / 2
                    - 1 / 12)
                    + _concrete.Fcd
                    * dy
                    * (dx * dy / 3 + dy * xi / 2 + dx * yi / 2 + xi * yi);
            }
            return factorS;
        }

        private double ResultantOfLinearSection(IList<PointD> linearSection)
        {
            double factorV = 0;
            for (int i = 0; i <= linearSection.Count - 2; i++)
            {
                var x1 = linearSection[i].X;
                var x2 = linearSection[i + 1].X;
                var y1 = linearSection[i].Y;
                var y2 = linearSection[i + 1].Y;
                factorV += (x1 - x2) * (y2 + y1);
            }
            factorV = 0.5 * factorV * _concrete.Fcd;
            return factorV;
        }

        private double FirstMomentOfAreaOfLinearSection(IList<PointD> linearSection)
        {
            var factorS = 0d;
            for (int i = 0; i <= linearSection.Count - 2; i++)
            {
                var x1 = linearSection[i].X;
                var x2 = linearSection[i + 1].X;
                var y1 = linearSection[i].Y;
                var y2 = linearSection[i + 1].Y;
                factorS += (x1 - x2) * (y1 * y1 + y1 * y2 + y2 * y2);
            }
            factorS = factorS * _concrete.Fcd / 6;
            return factorS;
        }
    }
}