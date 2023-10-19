namespace StruCal.SectionsEC.App.DTO
{
    public record ReinforcementDTO
    {
        public double Epsilon { get; init; }
        public double Sigma { get; init; }
        public BarDTO Bar { get; init; }
        public double D { get; init; }
        public double Moment { get; init; }
        public double Force { get; init; }
        public bool IsCompressed { get; init; }
    }
}