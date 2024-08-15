using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System.Text.Json;
using Tracjectory.API.Dtos;

namespace Tracjectory.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrajectoryController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetTrajectory()
        {
            var barPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            string path = Path.Combine(barPath, "Data", "trajectory.json");
            var reader = new StreamReader(path);
            var json = reader.ReadToEnd();
            Trajectory_ResultDto trajectory = JsonSerializer.Deserialize<Trajectory_ResultDto>(json);
            return this.Ok(trajectory);
        }
    }
}
