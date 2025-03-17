import { Routes } from '@angular/router';
import MainLayoutComponent from './views/main-layout/main-layout.component';
import StrategicAxisLayoutComponent from '../strategic-axis/views/strategic-axis/index/strategic-axis-index.component';

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
        component:StrategicAxisLayoutComponent ,
        loadChildren: () => import('../strategic-axis/strategic-axis.routes')
      }
    ]
  }
];

export default mainLayoutRoutes;