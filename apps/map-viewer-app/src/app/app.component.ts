import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapsModule, RoSegmentMapComponent } from '@rosen/map/components';
import { Subject, BehaviorSubject } from 'rxjs';
import { ApiService } from './apis/api.service';
import { BaseMapOptions, LeafletMap, Marker, Trajectory } from '@rosen/map/scripts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MapsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'map-viewer-app';

	options$ = new Subject<BaseMapOptions>();
  markers$ = new Subject<Marker[]>(); 

	@ViewChild(RoSegmentMapComponent) private _map: RoSegmentMapComponent;
	private leafletMap: LeafletMap;
	startEndOption = {};


  trajectory$: BehaviorSubject<Trajectory> = new BehaviorSubject<Trajectory>(null); // use BehaviorSubject to emit latest value when api data already cached
	startAnchorIndex$?: Subject<number> = new Subject<number>();
	endAnchorIndex$?: Subject<number> = new Subject<number>();

  constructor(private apiService: ApiService) {
    this.apiService.getTracjectory().subscribe((trajectory: GeoJSON.LineString) => {
      this.startAnchorIndex$.next(10);
      this.endAnchorIndex$.next(trajectory.coordinates.length - 10);
      this.trajectory$.next({
        geoLine: trajectory,
        options: {
          fill: false,
          weight: 16,
          color: '#3787FF',
          className: 'line-layer',
        },
      });

      this.selectMarker(trajectory.coordinates[3000][0], trajectory.coordinates[3000][1])
    })
  }

  ngOnInit(): void {
    setTimeout(() => {
			this.options$.next({
				useLayersControl: true,
				useCenterControl: true,
				useDrawingControl: true,
				useRectangleZoomControl: true,
				mapOptions: {
					maxBoundsViscosity: 10,
					preferCanvas: true,
				},
				scaleOptions: {
					imperial: true,
					metric: true,
				},
			});
		});
  }

  trajectoryReady(leafletMap: LeafletMap): void {
		this.leafletMap = leafletMap;
		this._map.setActiveArea({
			top: '64px',
			left: '336px',
			right: '218px',
			height: 'calc(100% - 180px)',
		});
		this._map.setBounds();
		this._map.fitBounds();

		this._map['_leafletMap'].map.on('zoomend', () => {
			this.startEndOption = {};
		});
	}

  private selectMarker(lng: number, lat: number): void {
    this.markers$.next([
        {
            point: [lng, lat],
            options: {
              iconSize: [18, 18],
              className: 'selected-marker',
            }
        },
    ]);
  }
}
