import { Component, inject } from "@angular/core";
import authService from "../../../../core/services/auth.service";

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  standalone: true
})
export default class MainDashboardComponent {
 authService = inject(authService);


}
