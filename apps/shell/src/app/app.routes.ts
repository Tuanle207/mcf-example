import { Routes } from '@angular/router';
import { ReportViewComponent } from './components/report-view.component';
import { IframeViewComponent } from './components/iframe-view.component';

export const routes: Routes = [
    {
        path: '',
        component: ReportViewComponent
    },
    {
        path: 'map',
        component: IframeViewComponent,
        data: { src: 'http://localhost:3000' },
    },
    {
        path: 'wirebreak',
        component: IframeViewComponent,
        data: { src: 'http://localhost:3001' },
    }
];