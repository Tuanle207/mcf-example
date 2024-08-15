// <copyright company="ROSEN Swiss AG">
//  Copyright (c) ROSEN Swiss AG
//  This computer program includes confidential, proprietary
//  information and is a trade secret of ROSEN. All use,
//  disclosure, or reproduction is prohibited unless authorized in
//  writing by an officer of ROSEN. All Rights Reserved.
// </copyright>

namespace Rosen.OnRepository.WLI.Dtos
{
    using System;
    using System.Collections.Generic;
    using System.Text.Json.Serialization;

    public class PipetallyEvents_ResultDto
    {
       
        [JsonPropertyName("inspectionSegmentId")]
        public Guid InspectionSegmentId { get; set; }

        [JsonPropertyName("totalCount")]
        public int TotalCount { get; set; }

        [JsonPropertyName("items")]
        public IEnumerable<PipetallyEvent_ResultDto> Items { get; set; }
    }
}
