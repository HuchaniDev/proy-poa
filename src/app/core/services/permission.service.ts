import { Injectable, inject } from "@angular/core";
import AuthService from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  #authService = inject(AuthService);

  #decodeToken(token:string){
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Error decoding token', error);
      return {};
    }

  }
  
  getUserRoles(): string[] {
    const token = this.#authService.getToken();
    if (token) {
      const decodedToken = this.#decodeToken(token);
      return decodedToken.roles || [];
    }
    return [];
  }

  getUserPermissions(): string[] {
    const token = this.#authService.getToken();
    if (token) {
      const decodedToken = this.#decodeToken(token);
      return decodedToken.permissions || [];
    }
    return [];
  }

   // Verificar si el usuario tiene un rol específico
   hasRole(role: string): boolean {
    const roles = this.getUserRoles();
    return roles.includes(role);
  }

  // Verificar si el usuario tiene un permiso específico
  hasPermission(permission: string): boolean {
    const permissions = this.getUserPermissions();
    return permissions.includes(permission);
  }

  // Verificar si el usuario tiene al menos uno de los roles proporcionados
  hasAnyRole(roles: string[]): boolean {
    const userRoles = this.getUserRoles();
    return roles.some(role => userRoles.includes(role));
  }

  // Verificar si el usuario tiene al menos uno de los permisos proporcionados
  hasAnyPermission(permissions: string[]): boolean {
    const userPermissions = this.getUserPermissions();
    return permissions.some(permission => userPermissions.includes(permission));
  }
}