import { AfterViewInit, Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapsModule, RoSegmentMapComponent } from '@rosen/map/components';
import { Subject, BehaviorSubject } from 'rxjs';
import { ApiService } from './apis/api.service';
import {
  BaseMapOptions,
  LeafletMap,
  Marker,
  Trajectory,
} from '@rosen/map/scripts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'map-viewer',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MapsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class MapViewComponent implements OnInit, AfterViewInit {
  title = 'map-viewer-app';

  options$ = new Subject<BaseMapOptions>();
  markers$ = new Subject<Marker[]>();

  @ViewChild(RoSegmentMapComponent) private _map: RoSegmentMapComponent;
  private leafletMap: LeafletMap;
  startEndOption = {};

  trajectory$: BehaviorSubject<Trajectory> = new BehaviorSubject<Trajectory>(
    null
  ); // use BehaviorSubject to emit latest value when api data already cached
  startAnchorIndex$?: Subject<number> = new Subject<number>();
  endAnchorIndex$?: Subject<number> = new Subject<number>();

  constructor(private apiService: ApiService, @Inject('MESSAGE_SERVICE') private messageService: any) {
    this.apiService
      .getTracjectory()
      .subscribe((trajectory: GeoJSON.LineString) => {
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

        this.selectMarker(
          trajectory.coordinates[3000][0],
          trajectory.coordinates[3000][1]
        );
      });
  }

  ngOnInit(): void {
    // this.loadLeafletCSS();

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

  ngAfterViewInit(): void {
    this.messageService?.message$.subscribe((message: any) => {
      console.log('Received message in map:', message);
      this.selectMarker(message.payload.longitude, message.payload.latitude);
    })
  }

  trajectoryReady(leafletMap: LeafletMap): void {
    this.leafletMap = leafletMap;
    this._map.setActiveArea({
      top: '0',
      left: '0',
      right: '0',
      height: '100%',
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
        },
      },
    ]);
  }


  // TODO: refactor to use proxy assets/remote in host for remote assets solution
  private async loadLeafletCSS() {
    // @import '../node_modules/leaflet/dist/leaflet.css';
    // @import '../node_modules/@rosen/map/styles/ro-map.scss';
    await loadCSS('http://localhost:3000/', 'public/leaflet/dist/leaflet.css');
    await loadCSS('http://localhost:3000/', 'public/@rosen/map/styles/ro-map.scss');
    console.log('Leaflet CSS loaded');
  }
}

function loadCSS(domain: string, path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${domain}${path}`;

    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load CSS: ${`${domain}${path}`}`));

    document.head.appendChild(link);
  });
}

// function loadCSS(domain: string, path: string): Promise<void> {
//   return new Promise((resolve, reject) => {
//     fetch(`${domain}${path}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`Failed to fetch CSS: ${`${domain}${path}`}`);
//         }
//         return response.text();
//       })
//       .then(cssContent => {
//         // Replace the relative paths with absolute paths
//         const modifiedCSS = cssContent.replace(new RegExp('../assets/', 'g'), `${domain}/assets/`);

//         // Create a style element and insert the modified CSS
//         const styleElement = document.createElement('style');
//         styleElement.textContent = modifiedCSS;
//         document.head.appendChild(styleElement);

//         resolve(); // Resolve the promise when CSS is successfully injected
//       })
//       .catch(error => {
//         reject(new Error(`Failed to load CSS: ${`${domain}${path}`} - ${error.message}`));
//       });
//   });
// }
