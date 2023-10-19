namespace StruCal.SectionsEC.App.DTO
{
    public record SectionsECInputDTO
    {
        public ConcreteDTO? Concrete { get; init; }
        public SteelDTO? Steel { get; init; }
        public IReadOnlyCollection<PointDDTO>? SectionCoordinates { get; init; }
        public IReadOnlyCollection<BarDTO>? Bars { get; init; }
        public IReadOnlyCollection<LoadCaseDTO>? LoadCases { get; init; }
    }
}