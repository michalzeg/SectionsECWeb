using SectionsEC.Calculations.Geometry;
using SectionsEC.Calculations.LoadCases;
using SectionsEC.Calculations.Sections;
using StruCal.SectionsEC.Calculations.Materials;
using System;
using System.Collections.Generic;

namespace SectionsEC.Calculations.Results
{
    public record CalculationResults
    {
        public IReadOnlyCollection<Reinforcement> Reinforcements { get; init; }
        public IList<PointD> CompressionZone { get; init; }
        public double Cz { get; init; }
        public double D { get; init; }
        public double Ec { get; init; }
        public double Es { get; init; }
        public double ForceConcrete { get; init; }
        public double H { get; init; }
        public LoadCase LoadCase { get; set; }
        public double Mrd { get; init; }
        public double MrdConcrete { get; init; }
        public double X { get; init; }
        public double ForceReinforcement { get; init; }
        public double MomentReinforcement { get; init; }
        public double CompressionAxialCapacity { get; init; }
        public double TensionAxialCapacity { get; init; }
        public Steel Steel { get; init; }
        public Concrete Concrete { get; init; }
    }
}