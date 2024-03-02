import { Injectable } from '@angular/core';
import { Curso } from '../../shared/interfaces/curso.model';


@Injectable({
  providedIn: 'root'
})
export class CursoService {

 private cursos: Curso[] = [
  { id: 1, nombre: 'Matemáticas', descripcion: 'Álgebra y Geometría', instructor: 'Juan Pérez', horario: 'Lunes y Miércoles 10:00 - 12:00' },
  { id: 2, nombre: 'Literatura', descripcion: 'Análisis literario y redacción', instructor: 'Laura García', horario: 'Martes y Jueves 09:00 - 11:00' },
  { id: 3, nombre: 'Física', descripcion: 'Física clásica y moderna', instructor: 'Carlos Vargas', horario: 'Lunes y Miércoles 14:00 - 16:00' },
  { id: 4, nombre: 'Química', descripcion: 'Química general y orgánica', instructor: 'María Lopez', horario: 'Martes y Jueves 11:00 - 13:00' },
  { id: 5, nombre: 'Biología', descripcion: 'Biología celular y molecular', instructor: 'Ana Torres', horario: 'Viernes 08:00 - 11:00' },
  { id: 6, nombre: 'Historia', descripcion: 'Historia universal', instructor: 'Pedro Gómez', horario: 'Miércoles 15:00 - 17:00' },
  { id: 7, nombre: 'Filosofía', descripcion: 'Pensamiento crítico y filosofía', instructor: 'Susana Ruiz', horario: 'Viernes 12:00 - 14:00' },
  { id: 8, nombre: 'Economía', descripcion: 'Fundamentos de economía', instructor: 'Jorge Hernández', horario: 'Lunes y Miércoles 08:00 - 10:00' },
  { id: 9, nombre: 'Programación', descripcion: 'Introducción a la programación', instructor: 'Luis Navarro', horario: 'Martes y Jueves 16:00 - 18:00' },
  { id: 10, nombre: 'Arte', descripcion: 'Historia del arte y pintura', instructor: 'Carmen Sánchez', horario: 'Miércoles y Viernes 10:00 - 12:00' },
  { id: 11, nombre: 'Educación Física', descripcion: 'Deportes y salud física', instructor: 'Mario Benedetti', horario: 'Lunes y Miércoles 12:00 - 14:00' },
  { id: 12, nombre: 'Música', descripcion: 'Teoría musical y práctica instrumental', instructor: 'Daniela Ramírez', horario: 'Martes y Jueves 14:00 - 16:00' },
  { id: 13, nombre: 'Psicología', descripcion: 'Psicología general y experimental', instructor: 'Gustavo Mendoza', horario: 'Viernes 14:00 - 17:00' },
  { id: 14, nombre: 'Sociología', descripcion: 'Fundamentos de sociología', instructor: 'Sofía Castro', horario: 'Lunes 15:00 - 18:00' }
 ]

  constructor() { }

  getCursos(): Curso[] {
    return this.cursos;
  }
}
