using System.Collections.Generic;

namespace StruCal.SectionsEC.App.DTO
{
    public record SectionsECResultDTO
    {
        public IReadOnlyCollection<CalculationResultsDTO> LoadCaseResults { get; init; }
    }
}