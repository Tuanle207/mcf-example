import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
import { FailedComponent } from './components/failed/failed.component';
import { ReportViewComponent } from './components/report-view.component';
import { IframeViewComponent } from './components/iframe-view.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { provideMessageService } from './services/message.service';
import { GlobalErrorHandler } from './services/globe-error-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    ReportViewComponent,
    IframeViewComponent,
    FailedComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: environment.auth0.redirectUri,
        audience: environment.auth0.audience,
      },
      useRefreshTokens: true,
      cacheLocation: 'memory',
      httpInterceptor: {
        allowedList: [
          { uri: `${environment.apiConfig.uri}/*` },
        ],
      },
    }),
  ],
  providers: [
    provideMessageService(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}