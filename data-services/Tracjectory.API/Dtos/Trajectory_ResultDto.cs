using System.Text.Json.Serialization;

namespace Tracjectory.API.Dtos
{
    public class Trajectory_ResultDto
    {
        [JsonPropertyName("inspectionSegmentId")]
        public Guid InspectionSegmentId { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("coordinates")]
        public IEnumerable<IEnumerable<double>> Coordinates { get; set; }

        [JsonPropertyName("logDistanceByTrajectory")]
        public IEnumerable<double> LogDistanceByTrajectory { get; set; }
    }
}
