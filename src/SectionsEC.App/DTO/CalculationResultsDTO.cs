namespace StruCal.SectionsEC.App.DTO
{
    public record CalculationResultsDTO
    {
        public IReadOnlyCollection<ReinforcementDTO> Reinforcements { get; init; }
        public IReadOnlyCollection<PointDDTO> CompressionZone { get; init; }
        public double D { get; init; }
        public double H { get; init; }
        public double Cz { get; init; }
        public double Ec { get; init; }
        public double Es { get; init; }
        public double ForceConcrete { get; init; }
        public LoadCaseDTO LoadCase { get; init; }
        public double Mrd { get; init; }
        public double MrdConcrete { get; init; }
        public double X { get; init; }
        public double ForceReinforcement { get; init; }
        public double MomentReinforcement { get; init; }
        public bool HasSolution { get; init; }
        public double CompressionAxialCapacity { get; init; }
        public double TensionAxialCapacity { get; init; }
        public SteelDTO Steel { get; init; }
        public ConcreteDTO Concrete { get; init; }
    }
}