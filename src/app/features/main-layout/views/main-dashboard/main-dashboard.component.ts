import { Component, inject } from "@angular/core";
import authService from "../../../../core/services/auth.service";
import { Feature } from "../../models/features";
import PermissionService from "../../../../core/services/permission.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  standalone: true
})
export default class MainDashboardComponent {
  #routes = inject(Router);
  permissionService = inject(PermissionService);

 constructor() {

 }

  features: Feature[] = [
    {
      name: 'Dashboard',
      route: '/dashboard',
      icon: 'dashboard',
      color: '',
      roles: ['Admin','']
    },
    {
      name: 'Users',
      route: '/users',
      icon: 'people',
      color: '',
      roles: ['Admin']
    },
    {
      name: 'Gestiones',
      route: '/management',
      icon: 'settings',
      color: '',
      roles: ['Admin']
    },
    {
      name: 'Unidad',
      route: '/unit',
      icon: 'settings',
      color: '',
      roles: ['Admin']
    },
    {
      name: 'Funionarios',
      route: '/official',
      icon: 'settings',
      color: '',
      roles: ['Admin']
    },
    {
      name: 'Reportes',
      route: '/report',
      icon: 'settings',
      color: '',
      roles: ['Admin','Planificador']
    },
    {
      name: 'Eje Estrategico',
      route: '/strategic-axis',
      icon: 'settings',
      color: '',
      roles: ['Admin']
    },
    {
      name: 'Poas',
      route: '/poa',
      icon: 'settings',
      color: '',
      roles: ['Director','Planificador']
    },
  ];

  navigateTo(route: string) {
    this.#routes.navigate([route]);
  }
}
