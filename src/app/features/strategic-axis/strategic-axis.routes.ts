import { Routes } from "@angular/router";

const strategicAxisRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/layout/strategic-axis-layout.component')
  }
];

export default strategicAxisRoutes;