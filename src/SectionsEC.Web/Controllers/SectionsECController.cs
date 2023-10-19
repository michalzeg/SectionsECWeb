using Microsoft.AspNetCore.Mvc;
using StruCal.SectionsEC.App;
using StruCal.SectionsEC.App.DTO;

namespace StruCal.SectionsEC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SectionsECController : ControllerBase
    {
        private readonly RcBeamService _rcBeamService;

        public SectionsECController(RcBeamService rcBeamService)
        {
            _rcBeamService = rcBeamService;
        }

        [HttpGet]
        [Route("materials")]
        public async Task<IActionResult> GetMaterials(CancellationToken cancellationToken)
        {
            var result = await _rcBeamService.GetMaterials(cancellationToken);
            return Ok(result);
        }

        [HttpPost]
        [Route("calculations")]
        public IActionResult Calculate(SectionsECInputDTO input)
        {
            var result = _rcBeamService.GetResult(input);
            return Ok(result);
        }
    }
}