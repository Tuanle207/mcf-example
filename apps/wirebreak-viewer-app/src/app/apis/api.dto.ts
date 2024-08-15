export interface WireBreak {
  idName: string;
  distance: number | null;
  type: string;
  typeKey: string;
  description: string;
  diameter: number | null;
  material: string;
  wallThickness: any;
  severityGroup: string;
  elevation: number | null;
  longitude: number | null;
  latitude: number | null;
  category: string;
  categoryKey: string;
  spoolLength: number | null;
  front: string;
  center: string;
  rear: string;
  maxOpeningGap: number | null;
  minOpeningGap: number | null;
  angle: number | null;
  oClockPosition: string;
  nominalDiameter: number | null;
  nominalMaterial: string;
  nominalWallThickness: number;
  numberOfBreaks: number | null;
  length: number | null;
  hasMedia: boolean;
}


export interface WireBreaks_ResultDto {
  inspectionSegmentId: string;
  totalCount: number;
  items: WireBreak[];
}