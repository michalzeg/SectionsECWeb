using SectionsEC.Calculations.Extensions;
using System;

namespace SectionsEC.Calculations.Sections
{
    public readonly record struct Bar
    {
        public double X { get; init; }
        public double Y { get; init; }

        public double D { get; init; }
        public readonly double As => Math.PI * D * D / 4;
    }
}