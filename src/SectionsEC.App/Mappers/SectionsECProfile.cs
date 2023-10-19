using AutoMapper;
using SectionsEC.Calculations.Geometry;
using SectionsEC.Calculations.LoadCases;
using SectionsEC.Calculations.Results;
using SectionsEC.Calculations.Sections;
using StruCal.SectionsEC.App.DTO;
using StruCal.SectionsEC.Calculations.Materials;

namespace StruCal.SectionsEC.App.Mappers
{
    public class SectionsECProfile : Profile
    {

        public SectionsECProfile()
        {
            CreateMap<Bar, BarDTO>();
            CreateMap<BarDTO, Bar>();
            CreateMap<PointD, PointDDTO>();
            CreateMap<PointDDTO, PointD>();
            CreateMap<Concrete, ConcreteDTO>();
            CreateMap<ConcreteDTO, Concrete>();
            CreateMap<LoadCase, LoadCaseDTO>();
            CreateMap<LoadCaseDTO, LoadCase>();

            CreateMap<CalculationResults, CalculationResultsDTO>().ForMember(dest => dest.HasSolution, opt => opt.MapFrom<HasSolutionResolver>());

            CreateMap<Reinforcement, ReinforcementDTO>();
            CreateMap<ReinforcementDTO, Reinforcement>();
            CreateMap<Steel, SteelDTO>();
            CreateMap<SteelDTO, Steel>();
            CreateMap<SectionsECInputDTO, SectionsECInput>();
            CreateMap<Material, MaterialDTO>();
        }
    }
}