import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
 private inscripciones: { [alumno: string]: string[] } = {};
 private solicitudesBaja: { [alumno: string]: string[] } = {}; // Nuevo


  constructor() {
    this.cargarInscripcionesDeLocalStorage();
    this.guardarInscripcionesEnLocalStorage();
    this.cargarSolicitudesDeBajaDeLocalStorage();
  }

  // Método para inscribir un alumno a múltiples materias
  inscribirAlumno(materias: string[], alumno: string): string[] {
    let materiasYaInscritas: string[] = [];
    if (this.inscripciones[alumno]) {
      materiasYaInscritas = materias.filter(materia => this.inscripciones[alumno].includes(materia));
      const materiasNuevas = materias.filter(materia => !this.inscripciones[alumno].includes(materia));
      this.inscripciones[alumno] = [...new Set([...this.inscripciones[alumno], ...materiasNuevas])];
    } else {
      this.inscripciones[alumno] = [...materias];
    }
    this.guardarInscripcionesEnLocalStorage();
    return materiasYaInscritas; // Devuelve las materias a las que el alumno ya estaba inscrito
  }

  // Método para obtener todas las inscripciones
  obtenerInscripciones() {
    return this.inscripciones;
  }

  // Método opcional para obtener las inscripciones de un alumno específico
  obtenerInscripcionesPorAlumno(alumno: string) {
    return this.inscripciones[alumno] || [];
  }

  // Método opcional para obtener todos los alumnos inscritos en una materia específica
  obtenerAlumnosPorMateria(materia: string): string[] {
    return Object.entries(this.inscripciones).reduce((alumnos, [nombre, materias]) => {
      if (materias.includes(materia)) {
        alumnos.push(nombre);
      }
      return alumnos;
    }, [] as string[]);
  }

 solicitarBaja(materia: string, alumno: string) {
    // Agrega la materia a las solicitudes de baja del alumno
    if (!this.solicitudesBaja[alumno]) {
      this.solicitudesBaja[alumno] = [];
    }
    if (!this.solicitudesBaja[alumno].includes(materia)) {
      this.solicitudesBaja[alumno].push(materia);
    }
    this.guardarSolicitudesBajaEnLocalStorage();
  }

    aprobarBaja(materia: string, alumno: string) {
    // Remueve la materia de las inscripciones y de las solicitudes de baja
    if (this.solicitudesBaja[alumno] && this.inscripciones[alumno]) {
      this.solicitudesBaja[alumno] = this.solicitudesBaja[alumno].filter(m => m !== materia);
      this.inscripciones[alumno] = this.inscripciones[alumno].filter(m => m !== materia);
      this.guardarSolicitudesBajaEnLocalStorage();
      this.guardarInscripcionesEnLocalStorage();
    }
  }

  // Métodos privados para manejar el almacenamiento local
  private cargarInscripcionesDeLocalStorage() {
    const inscripcionesGuardadas = localStorage.getItem('inscripciones');
    if (inscripcionesGuardadas) {
      this.inscripciones = JSON.parse(inscripcionesGuardadas);
    }
  }

  private guardarInscripcionesEnLocalStorage() {
    localStorage.setItem('inscripciones', JSON.stringify(this.inscripciones));
  }

  private cargarSolicitudesDeBajaDeLocalStorage() {
  const solicitudesBajaGuardadas = localStorage.getItem('solicitudesBaja');
  if (solicitudesBajaGuardadas) {
    this.solicitudesBaja = JSON.parse(solicitudesBajaGuardadas);
  }
}

  private guardarSolicitudesBajaEnLocalStorage() {
  localStorage.setItem('solicitudesBaja', JSON.stringify(this.solicitudesBaja));
}

  obtenerSolicitudesBaja(): { [alumno: string]: string[] } {
  return this.solicitudesBaja;
}

}
