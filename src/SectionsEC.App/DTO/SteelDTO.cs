namespace StruCal.SectionsEC.App.DTO
{
    public record SteelDTO
    {
        public string Grade { get; init; }

        public double Fyk { get; init; }

        public double GammaS { get; init; }

        public double K { get; init; }

        public double Es { get; init; }

        public double Euk { get; init; }

        public double EudToEuk { get; init; }

        public double Eud { get; init; }

        public double Fyd { get; init; }
    }
}