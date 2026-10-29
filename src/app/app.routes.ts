import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/productivity-tracker.component/productivity-tracker.component').then((m) => m.ProductivityTrackerComponent),
  },
];
