import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioActualService } from '../core/services/usuario-actual-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private usuarioActualService: UsuarioActualService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const usuarioActual = this.usuarioActualService.getUsuarioActual();
    if (usuarioActual) {
      // Usuario está autenticado, permitir acceso
      return true;
    } else {
      // Usuario no está autenticado, redirigir a login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
