import { Injectable, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export default class AuthService {
  #route = inject(Router);
  user = signal<{ id: string, username: string, role: string } | null>(null);

  storeToken(token: string) {
    localStorage.setItem('token', token);
    this.#decodeToken();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    this.#decodeToken();
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.#route.navigate(['/login']);
  }

  #decodeToken() {
    const token = this.getToken();
    if (!token) return;

    try {
      // Usando jwt-decode para decodificar el token
      const decoded: any = jwtDecode(token);
      
      // Asignando el valor de los campos al usuario
      this.user.set({
        id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        username: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decoded["role"] || "",
      });
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      this.user.set(null);
    }
  }
}

