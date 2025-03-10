import { Routes } from '@angular/router';

const mainLayoutRoutes: Routes = [
  {
    path:'',
    loadComponent: () => import('./views/main-layout/main-layout.component'),
    children:[
      
    ] 
  }
];

export default mainLayoutRoutes;