import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { routes } from './app.routes';
import { KeycloakConfig } from './config/keycloak.config';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak
      .init({
        config:KeycloakConfig,
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false,
        },
        enableBearerInterceptor: true,
      })
      .then(async (authenticated) => {
        if (authenticated) {
          localStorage.setItem('Token', await keycloak.getToken());
        } else {
          console.warn('User not authenticated');
        }
      })
      .catch((error) => {
        console.error('Keycloak initialization failed:', error);
      });
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    KeycloakService,
  ]
};