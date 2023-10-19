using SectionsEC.Calculations.Extensions;
using SectionsEC.Calculations.Geometry;
using SectionsEC.Calculations.SectionProperties;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SectionsEC.Calculations.Slicings
{
    internal class SlicingCalculator
    {
        public SectionSlice GetSlice(IList<PointD> coordinates, double upperY, double lowerY)
        {
            var lowerCoordinates = LowerSection(coordinates, lowerY);
            var upperCoordinates = UpperSection(lowerCoordinates, upperY);
            var sectionSlice = CalculateProperties(upperCoordinates);
            return sectionSlice;
        }

        private SectionSlice CalculateProperties(IList<PointD> coordinates)
        {
            var slice = new SectionSlice
            {
                Area = SectionPropertiesCalculator.Area(coordinates),
                CentreOfGravityY = SectionPropertiesCalculator.CenterElevation(coordinates)
            };
            return slice;
        }

        private IList<PointD> LowerSection(IList<PointD> section, double a)
        {
            var compressedSection = new List<PointD>();

            for (int i = 0; i <= section.Count - 2; i++)
            {
                var pointA = section[i];
                var pointB = section[i + 1];
                if ((pointA.Y - pointB.Y).IsApproximatelyEqualTo(0))
                {
                    if (pointA.Y >= a && pointB.Y >= a)
                    {
                        compressedSection.Add(pointA);
                        compressedSection.Add(pointB);
                    }
                }
                else
                {
                    var pointPP = IntersectionPoint(pointA, pointB, a);
                    if (IsPointInsideSection(pointA, pointB, pointPP))
                    {
                        if (pointA.Y > pointPP.Y)
                        {
                            compressedSection.Add(pointA);
                            compressedSection.Add(pointPP);
                        }
                        else
                        {
                            compressedSection.Add(pointPP);
                            compressedSection.Add(pointB);
                        }
                    }
                    else
                    {
                        if (pointA.Y >= a && pointB.Y >= a)
                        {
                            compressedSection.Add(pointA);
                            compressedSection.Add(pointB);
                        }
                    }
                }
            }
            CheckSection(compressedSection);

            return compressedSection;
        }

        private static void CheckSection(IList<PointD> parabolicSection)
        {
            var firstPoint = parabolicSection.FirstOrDefault();
            var lastPoint = parabolicSection.LastOrDefault();

            if (parabolicSection.Count > 0
                && !firstPoint.Equals(lastPoint))
            {
                parabolicSection.Add(firstPoint);
            }
        }

        private List<PointD> UpperSection(IList<PointD> compressedSection, double a)
        {
            var parabolicSection = new List<PointD>();

            for (int i = 0; i <= compressedSection.Count - 2; i++)
            {
                var pointA = compressedSection[i];
                var pointB = compressedSection[i + 1];
                if ((pointA.Y - pointB.Y).IsApproximatelyEqualTo(0))
                {
                    if (pointA.Y <= a && pointB.Y <= a)
                    {
                        parabolicSection.Add(pointA);
                        parabolicSection.Add(pointB);
                    }
                }
                else
                {
                    var pointPP = IntersectionPoint(pointA, pointB, a);
                    if (IsPointInsideSection(pointA, pointB, pointPP))
                    {
                        if (pointA.Y > pointPP.Y)
                        {
                            parabolicSection.Add(pointPP);
                            parabolicSection.Add(pointB);
                        }
                        else
                        {
                            parabolicSection.Add(pointA);
                            parabolicSection.Add(pointPP);
                        }
                    }
                    else
                    {
                        if (pointA.Y <= a && pointB.Y <= a)
                        {
                            parabolicSection.Add(pointA);
                            parabolicSection.Add(pointB);
                        }
                    }
                }
            }
            CheckSection(parabolicSection);
            return parabolicSection;
        }

        private static PointD IntersectionPoint(PointD a1, PointD a2, double a)
        {
            var xa = a1.X;
            var xb = a2.X;
            var ya = a1.Y;
            var yb = a2.Y;
            var y = a;
            var x = (a - ya) * (xb - xa) / (yb - ya) + xa;
            var result = new PointD(x, y);
            return result;
        }

        private static bool IsPointInsideSection(PointD A, PointD B, PointD P)
        => Math.Min(A.X, B.X) <= P.X && P.X <= Math.Max(A.X, B.X)
            && Math.Min(A.Y, B.Y) <= P.Y && P.Y <= Math.Max(A.Y, B.Y);
    }
}