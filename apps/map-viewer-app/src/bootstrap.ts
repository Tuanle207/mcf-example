import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { MapViewComponent } from './app/app.component';

bootstrapApplication(MapViewComponent, appConfig)
  .catch((err) => console.error(err));
