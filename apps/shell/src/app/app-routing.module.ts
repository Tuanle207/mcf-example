import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { ReportViewComponent } from './components/report-view.component';
import { FailedComponent } from './components/failed/failed.component';
import { IframeViewComponent } from './components/iframe-view.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ReportViewComponent,
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
      },
    ]
  },
  {
    path: 'login-failed',
    component: FailedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledNonBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}