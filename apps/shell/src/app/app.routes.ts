import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('map_viewer_app/MapViewComponent').then(m => m.MapViewComponent)
    }
];
