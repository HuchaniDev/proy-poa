import { Injectable, inject } from "@angular/core";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export default class PermissionService {


  getToken() {
    return localStorage.getItem('token');
    
  }

  // Decodificar el token JWT utilizando jwt-decode
  #decodeToken(token: string): any {
    try {
      // Usando jwt-decode para decodificar el token
      return jwtDecode(token);
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return null;
    }
  }

  getUserRoles(): string[] {
    const token = this.getToken();
    if (token) {
      
      const decodedToken = this.#decodeToken(token);
      const roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]|| decodedToken["role"] || "";
      return roles;
    }
    return [];
  }

  getUserPermissions(): string[] {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.#decodeToken(token);
      const permissions = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/permission"]|| decodedToken["permission"] || "";;
      return permissions;
    }
    return [];
  }

  // Verificar si el usuario tiene un rol específico
  hasRole(role: string): boolean {
    const roles = this.getUserRoles();
    return roles.includes(role.toString());
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