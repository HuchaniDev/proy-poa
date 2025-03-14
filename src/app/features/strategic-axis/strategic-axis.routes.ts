import { Routes } from '@angular/router';

const strategicAxisRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/layout/strategic-axis-layout.component')
  },
  {
    path: 'strategic-line',
    loadComponent: () => import('./views/strategic-line/index/strategic-line-index.component')
  }
];

export default strategicAxisRoutes;