using Microsoft.AspNetCore.Mvc;
using Rosen.OnRepository.WLI.Dtos;
using System.Reflection;
using System.Text.Json;

namespace WireBreak.API.Controllers
{
    [ApiController]
    [Route("api/wire-breaks")]
    public class WireBreakController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetWireBreaks()
        {
            var basePath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            string path = Path.Combine(basePath, "Data", "wire-breaks.json");
            var reader = new StreamReader(path);
            var json = reader.ReadToEnd();
            PipetallyEvents_ResultDto result = JsonSerializer.Deserialize<PipetallyEvents_ResultDto>(json);
            return this.Ok(result);
        }
    }
}
