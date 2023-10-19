using AutoMapper;
using Newtonsoft.Json;
using StruCal.SectionsEC.App.DTO;
using StruCal.SectionsEC.Calculations;
using StruCal.SectionsEC.Calculations.Materials;
using System.Reflection;

namespace StruCal.SectionsEC.App
{
    public class RcBeamService
    {
        private readonly IMapper _mapper;

        public RcBeamService(IMapper mapper)
        {
            _mapper = mapper;
        }


        public async Task<MaterialDTO> GetMaterials(CancellationToken cancellationToken)
        {
            var assemblyPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var filePath = Path.Combine(assemblyPath!, "materials.json");
            var content = await File.ReadAllTextAsync(filePath, cancellationToken);
            var result = JsonConvert.DeserializeObject<Material>(content);
            return _mapper.Map<MaterialDTO>(result);
        }

        public SectionsECResultDTO GetResult(SectionsECInputDTO rcBeamInputDTO)
        {
            var input = _mapper.Map<SectionsECInput>(rcBeamInputDTO);

            var result = CapacityCalculatorFacade.GetSectionCapacity(input.Concrete,input.Steel,input.SectionCoordinates,input.Bars,input.LoadCases);
            return new SectionsECResultDTO
            {
                LoadCaseResults = _mapper.Map<IReadOnlyCollection<CalculationResultsDTO>>(result)
            };
        }
    }
}