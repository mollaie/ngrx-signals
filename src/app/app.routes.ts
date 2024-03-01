import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/posts',
    pathMatch: 'full',
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./features/pages/post.component').then((m) => m.PostComponent),
  },
];
