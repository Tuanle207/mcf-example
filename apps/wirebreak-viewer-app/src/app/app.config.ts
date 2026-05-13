import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideMessageService } from './services/post-message.service';
import {
  MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG,
  MsalBroadcastService, MsalGuard, MsalInterceptor, MsalService,
  MsalGuardConfiguration, MsalInterceptorConfiguration,
} from '@azure/msal-angular';
import {
  BrowserCacheLocation, InteractionType,
  IPublicClientApplication, PublicClientApplication,
} from '@azure/msal-browser';
import { environment } from '../environments/environment';

function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.b2c.clientId,
      authority: environment.b2c.authority,
      knownAuthorities: [environment.b2c.knownAuthority],
      redirectUri: 'http://localhost:3001',
    },
    cache: {
      // MemoryStorage: tokens stay in memory only, safe for iframe context
      cacheLocation: BrowserCacheLocation.MemoryStorage,
    },
  });
}

function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Popup,  // Must be Popup inside iframe
    authRequest: { scopes: environment.b2c.scopes },
  };
}

function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, string[]>();
  protectedResourceMap.set(`${environment.apiUrl}/*`, environment.b2c.scopes);
  return {
    interactionType: InteractionType.Popup,  // Must be Popup inside iframe
    protectedResourceMap,
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
    { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory },
    { provide: MSAL_GUARD_CONFIG, useFactory: MSALGuardConfigFactory },
    { provide: MSAL_INTERCEPTOR_CONFIG, useFactory: MSALInterceptorConfigFactory },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    provideMessageService(),
  ]
};
