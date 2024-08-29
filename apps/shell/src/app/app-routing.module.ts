import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';
import { ReportViewComponent } from './components/report-view.component';
import { FailedComponent } from './components/failed/failed.component';
import { canActivateGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [canActivateGuard, MsalGuard],
    children: [
      {
        path: '',
        component: ReportViewComponent,
      },
      {
        path: 'map',
        loadComponent: () => import('map_viewer_app/MapViewComponent').then(m => m.MapViewComponent),
      },
      {
        // NOTE: handle fallback when the remote is offline or not available
        path: 'wirebreak',
        loadComponent: () =>
          import('wirebreak_viewer_app/WirebreakListComponent')
            .then(m => m.WirebreakListComponent)
            .catch(err => {
              console.error('Error loading remote component:', err);
              // Handle the error by returning a fallback component
              // return import('./fallback/fallback.component').then(m => m.FallbackComponent);
            }),
      },
    ]
  },
  {
    path: 'login-failed',
    component: FailedComponent
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        // Don't perform initial navigation in iframes or popups
        initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() ? 'enabledNonBlocking' : 'disabled' // Set to enabledBlocking to use Angular Universal
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }