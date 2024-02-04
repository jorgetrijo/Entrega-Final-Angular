import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../../shared/interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioActualService {
  private usuarioActualSubject = new BehaviorSubject<Usuario | null>(null);
  usuarioActual$: Observable<Usuario | null> = this.usuarioActualSubject.asObservable();

  constructor() {}

  setUsuarioActual(usuario: Usuario | null) {
    this.usuarioActualSubject.next(usuario);
  }

  getUsuarioActual(): Usuario | null {
    return this.usuarioActualSubject.value;
  }

  cerrarSesion() {
    this.usuarioActualSubject.next(null);
  }
}
