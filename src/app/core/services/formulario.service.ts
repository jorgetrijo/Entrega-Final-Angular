import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Usuario } from '../../shared/interfaces/usuario.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormularioService {
   private apiUrl = 'http://localhost:3000/usuarios'; // La URL base de tu API

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios registrados
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Agregar un nuevo usuario
  agregarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  // Obtiene el usuario que se intenta loguear
  obtenerUsuario(nombreUsuario: string): Observable<Usuario | undefined> {
  return this.http.get<Usuario[]>(`${this.apiUrl}?usuario=${nombreUsuario}`)
    .pipe(
      map(usuarios => usuarios[0]) // Toma el primer usuario del array
    );
}

  // Actualizar un usuario
  actualizarUsuario(usuarioId: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${usuarioId}`, usuario);
  }

  // Eliminar un usuario por su ID
  eliminarUsuario(usuarioId: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${usuarioId}`);
  }
}
