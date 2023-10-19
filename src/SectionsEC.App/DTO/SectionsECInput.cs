using SectionsEC.Calculations.Geometry;
using SectionsEC.Calculations.LoadCases;
using SectionsEC.Calculations.Sections;
using StruCal.SectionsEC.Calculations.Materials;

namespace StruCal.SectionsEC.App.DTO
{
    public record SectionsECInput
    {
        public Concrete Concrete { get; set; }
        public Steel Steel { get; set; }
        public IList<PointD> SectionCoordinates { get; set; }
        public IList<Bar> Bars { get; set; }
        public IList<LoadCase> LoadCases { get; set; }
    }
}