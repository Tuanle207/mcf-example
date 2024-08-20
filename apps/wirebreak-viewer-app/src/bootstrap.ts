import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { WirebreakListComponent } from './app/app.component';

bootstrapApplication(WirebreakListComponent, appConfig)
  .catch((err) => console.error(err));