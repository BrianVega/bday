import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withEnabledBlockingInitialNavigation, withHashLocation} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withHashLocation(),
      withEnabledBlockingInitialNavigation()
    ),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync()
  ]
};
