namespace SectionsEC.Calculations.Results
{
    public readonly record struct CompressionZoneResult
    {
        public double Moment { get; init; }
        public double NormalForce { get; init; }
    }
}