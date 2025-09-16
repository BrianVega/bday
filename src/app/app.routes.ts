import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'birthday-countdown/17/09/Mi amor',
      pathMatch: 'full'
    },
    {
      path: 'birthday-countdown/:day/:month/:name',
      loadComponent: () => import('./birthday-countdown/birthday-countdown.component').then(c => c.BirthdayCountdownComponent)
    },
    {
      path: 'happy-birthday',
      loadComponent: () => import('./birthday-landing-page/birthday-landing-page.component').then(c => c.BirthdayLandingPageComponent)
    },
    {
      path: '**',
      loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];
