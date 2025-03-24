import { Routes } from '@angular/router';
import MainLayoutComponent from './views/main-layout/main-layout.component';

const mainLayoutRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path:'',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./views/main-dashboard/main-dashboard.component'),
      },
      {
        path:'strategic-axis',
        loadComponent:() => import('./views/strategic-axis/index/strategic-axis-index.component'),
      },
      {
        path:'strategic-line',
        loadComponent:() => import('./views/strategic-axis/strategic-line/index/strategic-line-index.component'),
      }

    ]
  }
];

export default mainLayoutRoutes;