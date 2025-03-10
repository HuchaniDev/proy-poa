import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import MainHeaderComponent from "../../controls/main-header/main-header.component";
import { Feature } from "../../models/features";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MainHeaderComponent
]
})
export default class MainLayoutComponent {

  public features:Feature[] = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      route: 'dashboard'
    },
    {
      name: 'Usuarios',
      icon: 'people',
      route: 'users'
    },
    {
      name: 'Productos',
      icon: 'shopping_cart',
      route: 'products'
    },
    {
      name: 'Categorias',
      icon: 'category',
      route: 'categories'
    }
  ];

}