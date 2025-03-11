import { Component, inject } from "@angular/core";
import authService from "../../../../core/services/auth.service";
import { Feature } from "../../models/features";
import PermissionService from "../../../../core/services/permission.service";

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  standalone: true
})
export default class MainDashboardComponent {
  permissionService = inject(PermissionService);
 authService = inject(authService);

 constructor() {

 }

  features: Feature[] = [
    {
      name: 'Dashboard',
      route: '/dashboard',
      icon: 'dashboard',
      color: '',
      roles: ['Admin','other']
    },
    {
      name: 'Users',
      route: '/users',
      icon: 'people',
      color: '',
      roles: ['Admin']
    },
    {
      name: 'Gestion',
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
      roles: ['other']
    },
    {
      name: 'Reportes',
      route: '/report',
      icon: 'settings',
      color: '',
      roles: ['Admin']
    },
    {
      name: 'Poas',
      route: '/poa',
      icon: 'settings',
      color: '',
      roles: ['Admin']
    },
  ];
}
