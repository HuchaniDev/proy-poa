import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import MainHeaderComponent from "../../controls/main-header/main-header.component";
import { ToastComponent } from "../../../../shared/controls/toast-alert/toast.component";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MainHeaderComponent,
    ToastComponent
]
})
export default class MainLayoutComponent {

}