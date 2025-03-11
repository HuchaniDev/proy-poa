import { Component, effect, inject } from "@angular/core";
import authService from "../../../../core/services/auth.service";
import { UpperCasePipe } from "@angular/common";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  standalone: true,
  imports: [
    UpperCasePipe
  ]

})
export default class MainHeaderComponent {
  #authService = inject(authService)
  title = 'POA - SPO'

  userName:string|null = null
  role:string|null = null

  userEffect = effect(()=>{
    const user = this.#authService.user();
    if(user){
      this.userName = user.username;
      this.role = user.role;
    }
    console.log('user', user);
    console.log('userName', this.userName);
    
  });

  logout(){
    this.#authService.logout();
  }

}