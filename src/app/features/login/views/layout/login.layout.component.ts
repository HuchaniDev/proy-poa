import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component
({
  selector: 'app-login-layout',
  templateUrl: './login.layout.component.html',
  standalone: true,
  imports: [
    RouterOutlet
  ]
})
export default class LoginLayoutComponent {
  
}