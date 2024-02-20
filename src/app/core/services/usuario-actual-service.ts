import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../../shared/interfaces/usuario.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsuarioActualService {
  private usuarioActualSubject = new BehaviorSubject<Usuario | null>(this.getUsuarioFromStorage());
  usuarioActual$: Observable<Usuario | null> = this.usuarioActualSubject.asObservable();

  constructor() {}

  setUsuarioActual(usuario: Usuario | null) {
    this.usuarioActualSubject.next(usuario);
    if (usuario) {
      localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuarioActual');
    }
  }

  getUsuarioActual(): Usuario | null {
    return this.usuarioActualSubject.value;
  }

  cerrarSesion() {
    this.usuarioActualSubject.next(null);
    localStorage.removeItem('usuarioActual');
  }

  private getUsuarioFromStorage(): Usuario | null {
    const usuario = localStorage.getItem('usuarioActual');
    return usuario ? JSON.parse(usuario) : null;
  }
}
