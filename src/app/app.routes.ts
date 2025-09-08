import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'birthday-countdown/:day/:month/:name', 
        loadComponent: () => import('./birthday-countdown/birthday-countdown.component').then(c => c.BirthdayCountdownComponent) 
    }
];
