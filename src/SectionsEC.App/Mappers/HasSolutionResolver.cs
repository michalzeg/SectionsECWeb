using AutoMapper;
using SectionsEC.Calculations.Results;
using StruCal.SectionsEC.App.DTO;

namespace StruCal.SectionsEC.App.Mappers
{
    public class HasSolutionResolver : IValueResolver<CalculationResults, CalculationResultsDTO, bool>
    {
        public bool Resolve(CalculationResults source, CalculationResultsDTO destination, bool destMember, ResolutionContext context) => !double.IsNaN(source.Mrd);
    }
}