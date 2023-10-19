namespace StruCal.SectionsEC.App.DTO
{
    public record LoadCaseDTO
    {
        public string Name { get; init; }
        public double NormalForce { get; init; }
        public int Id { get; init; }
    }
}