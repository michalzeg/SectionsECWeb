using System;
using System.Collections.Generic;
using System.Linq;
using SectionsEC.Calculations.Geometry;
using SectionsEC.Calculations.Interfaces;
using SectionsEC.Calculations.SectionProperties;

namespace SectionsEC.Calculations.Sections
{
    public class SectionGeometry
    {
        public IList<PointD> Coordinates { get; } = new List<PointD>();
        public double MaxY { get; }
        public double MinY { get; }
        public double H { get; }
        public double Cz { get; }

        public double LeverArm => H - Cz;

        public SectionGeometry(IList<PointD> coordinates)
        {
            if (coordinates?.Any() ?? false)
            {
                Coordinates = NormalizeCoordinatesToClockwise(coordinates);
                MinY = Coordinates.Min(p => p.Y);
                MaxY = Coordinates.Max(p => p.Y);
                H = MaxY - MinY;
                Cz = SectionPropertiesCalculator.CenterElevation(Coordinates, MaxY);
            }
        }

        public double GetNeutralAxis(double x) => MaxY - x;

        private static IList<PointD> NormalizeCoordinatesToClockwise(IList<PointD> coordinates)
        {
            var result = coordinates;
            for (int i = 0; i <= coordinates.Count - 3; i++)
            {
                var iw = CrossProduct(coordinates[i], coordinates[i + 1], coordinates[i + 2]);
                if (iw > 0)
                {
                    break;
                }
                else if (iw < 0)
                {
                    result = coordinates.Reverse().ToList();
                    break;
                }
            }
            return result;
        }

        private static double CrossProduct(PointD p0, PointD p1, PointD p2)
        {
            var vector1 = new double[2];
            var vector2 = new double[2];
            vector1[0] = p1.X - p0.X;
            vector1[1] = p1.Y - p0.Y;
            vector2[0] = p2.X - p1.X;
            vector2[1] = p2.Y - p1.Y;
            var result = (vector1[0] * vector2[1]) - (vector1[1] * vector2[0]);
            return result;
        }
    }
}