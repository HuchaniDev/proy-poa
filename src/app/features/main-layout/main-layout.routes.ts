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
        path: '',
        loadComponent: () => import('./views/main-dashboard/main-dashboard.component'),
      },
    ]
  }
];

export default mainLayoutRoutes;