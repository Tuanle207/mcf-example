// <copyright company="ROSEN Swiss AG">
//  Copyright (c) ROSEN Swiss AG
//  This computer program includes confidential, proprietary
//  information and is a trade secret of ROSEN. All use,
//  disclosure, or reproduction is prohibited unless authorized in
//  writing by an officer of ROSEN. All Rights Reserved.
// </copyright>

using System.Text.Json.Serialization;

namespace Rosen.OnRepository.WLI.Dtos
{
    public class PipetallyEvent_ResultDto
    {
        [JsonPropertyName("idName")]
        public string IdName { get; set; }

        [JsonPropertyName("distance")]
        public double? Distance { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("typeKey")]
        public string TypeKey { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("diameter")]
        public double? Diameter { get; set; }

        [JsonPropertyName("material")]
        public string Material { get; set; }

        [JsonPropertyName("wallThickness")]
        public object WallThickness { get; set; }

        [JsonPropertyName("severityGroup")]
        public string SeverityGroup { get; set; }

        [JsonPropertyName("elevation")]
        public double? Elevation { get; set; }

        [JsonPropertyName("longitude")]
        public double? Longitude { get; set; }

        [JsonPropertyName("latitude")]
        public double? Latitude { get; set; }

        [JsonPropertyName("category")]
        public string Category { get; set; }

        [JsonPropertyName("categoryKey")]
        public string CategoryKey { get; set; }


        [JsonPropertyName("spoolLength")]
        public double? SpoolLength { get; set; }

        [JsonPropertyName("front")]
        public string Front { get; set; }

        [JsonPropertyName("center")]
        public string Center { get; set; }

        [JsonPropertyName("rear")]
        public string Rear { get; set; }

        [JsonPropertyName("maxOpeningGap")]
        public double? MaxOpeningGap { get; set; }

        [JsonPropertyName("minOpeningGap")]
        public double? MinOpeningGap { get; set; }

        [JsonPropertyName("angle")]
        public double? Angle { get; set; }

        [JsonPropertyName("oClockPosition")]
        public string OClockPosition { get; set; }

        [JsonPropertyName("nominalDiameter")]
        public double? NominalDiameter { get; set; }

        [JsonPropertyName("nominalMaterial")]
        public string NominalMaterial { get; set; }

        [JsonPropertyName("nominalWallThickness")]
        public dynamic NominalWallThickness { get; set; }

        [JsonPropertyName("numberOfBreaks")]
        public int? NumberOfBreaks { get; set; }

        [JsonPropertyName("length")]
        public double? Length { get; set; }

        [JsonPropertyName("hasMedia")]
        public bool HasMedia { get; set; }
    }
}
