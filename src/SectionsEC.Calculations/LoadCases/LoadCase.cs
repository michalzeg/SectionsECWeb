using SectionsEC.Calculations.Extensions;
using System;

namespace SectionsEC.Calculations.LoadCases
{
    public readonly record struct LoadCase
    {
        public int Id { get; init; }
        public string Name { get; init; }
        public double NormalForce { get; init; }
    }
}