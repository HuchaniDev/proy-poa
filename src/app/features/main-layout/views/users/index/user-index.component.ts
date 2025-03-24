import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { PageHeaderComponent } from "../../../../../shared/controls/page-header";

@Component({
  selector:'app-user',
  templateUrl:'./user-index.component.html',
  standalone:true,
  imports: [
    PageHeaderComponent,
    CommonModule,
  ]
})
export default class UserComponent{
 
 
  constructor() {
    
  }
}