import { Routes } from '@angular/router';
import LoginLayoutComponent from './views/layout/login.layout.component';

const loginRoutes: Routes =[
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path:'',
    component: LoginLayoutComponent,
    children:[
      {
        path: '',
        loadComponent: () => import('./views/login/index/login-index.component')
      }
    ]
  },
]

export default loginRoutes;