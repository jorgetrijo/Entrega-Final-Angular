import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Usuario } from '../../shared/interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class FormularioService {
  private usuariosRegistradosSubject = new BehaviorSubject<Usuario[]>([]);
  usuariosRegistrados$ = this.usuariosRegistradosSubject.asObservable();

  private usuarioActualSubject = new Subject<Usuario | null>();
  usuarioActual$ = this.usuarioActualSubject.asObservable();

  private usuariosIniciales: Usuario[] = [
    {
      nombre: 'Jorge',
      apellido: 'Trijo',
      usuario: 'jtrijo',
      email: 'jorge@coherhouse.com',
      contraseña: 'secreta',
      direccion: 'Av siempre viva 123',
      ciudad: 'Springfield',
    },
    {
      nombre: 'Estudiante',
      apellido: 'Coderhouse',
      usuario: 'coder',
      email: 'estudiante@coherhouse.com',
      contraseña: 'secreta',
      direccion: 'Av nunca viva 123',
      ciudad: 'Shelbyville',
    },
  ];

  private usuarioActual: Usuario | null = null;

  constructor() {
    // Cargar usuarios iniciales al inicio
    this.usuariosRegistradosSubject.next(this.usuariosIniciales);
  }

  agregarUsuario(usuario: Usuario) {
    const usuariosActuales = this.usuariosRegistradosSubject.value;

    // Verificar duplicados antes de agregar
    const usuarioExistente = usuariosActuales.some(
      (u) => u.usuario === usuario.usuario || u.email === usuario.email
    );

    if (!usuarioExistente) {
      this.usuariosRegistradosSubject.next([...usuariosActuales, usuario]);

      // Actualizar el usuario actual
      this.usuarioActual = usuario;
    }
  }

  obtenerUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }

  obtenerUsuario(nombreUsuario: string): Usuario | undefined {
    return this.usuariosRegistradosSubject.value.find(u => u.usuario === nombreUsuario);
  }

  obtenerUsuarios() {
    return this.usuariosRegistradosSubject.value;
  }

  eliminarUsuario(usuario: Usuario) {
    const usuariosActuales = this.usuariosRegistradosSubject.value;
    const nuevosUsuarios = usuariosActuales.filter((u) => u !== usuario);
    this.usuariosRegistradosSubject.next([...nuevosUsuarios]);
  }
}
