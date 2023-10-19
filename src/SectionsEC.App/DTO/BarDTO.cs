
using SectionsEC.Calculations.Sections;

namespace StruCal.SectionsEC.App.DTO
{
    public record BarDTO
    {
        public double X { get; init; }
        public double Y { get; init; }
        public double D { get; init; }
        public double As { get; init; }
    }
}