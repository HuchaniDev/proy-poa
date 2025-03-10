import { inject } from "@angular/core";
import { CanActivateChildFn, Router } from "@angular/router";
import { PermissionService } from "../services/permission.service";

export const permissionGuard: CanActivateChildFn = (route) => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  const requiredRoles = route.data['roles'] as string[];
  const requiredPermissions = route.data['permissions'] as string[];

  // Verificar si el usuario tiene los roles y permisos requeridos
  if (permissionService.hasAnyRole(requiredRoles) && permissionService.hasAnyPermission(requiredPermissions)) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};