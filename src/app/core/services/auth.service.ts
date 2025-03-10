import { Injectable, inject, signal } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export default class AuthService {
  #route = inject(Router);
  user = signal<{ id: string, username: string } | null>(null);

  storeToken(token:string){
    localStorage.setItem('token', token);
    this.#decodeToken();
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isAuthenticated(){
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.#route.navigate(['/login']);
  }

  #decodeToken() {
    const token = this.getToken();
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.user.set({
        id: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        username: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
      });
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      this.user.set(null);
    }
  }
}