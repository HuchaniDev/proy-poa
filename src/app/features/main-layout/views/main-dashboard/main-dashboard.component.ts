import { Component, inject } from "@angular/core";
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

  navigateTo(route: string) {
    this.#routes.navigate([route]);
  }
}
