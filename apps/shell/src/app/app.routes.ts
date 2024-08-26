import { Routes } from '@angular/router';
import { ReportViewComponent } from './report-view.component';

export const routes: Routes = [
    {
        path: '',
        component: ReportViewComponent
    },
    {
        path: 'map',
        loadComponent: () => import('map_viewer_app/MapViewComponent').then(m => m.MapViewComponent)
    },
    {
        path: 'wirebreak',
        loadComponent: () => import('wirebreak_viewer_app/WirebreakListComponent').then(m => m.WirebreakListComponent)
    }
];