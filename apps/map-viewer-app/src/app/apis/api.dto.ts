export interface Trajectory extends GeoJSON.LineString {
	inspectionSegmentId: string;
	logDistanceByTrajectory: number[];
}