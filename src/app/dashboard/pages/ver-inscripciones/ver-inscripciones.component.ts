import { Component, OnInit } from '@angular/core';
import { InscripcionService } from '../../../core/services/inscripcion.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ver-inscripciones',
  templateUrl: './ver-inscripciones.component.html',
  styleUrl: './ver-inscripciones.component.scss'
})
export class VerInscripcionesComponent implements OnInit {
   // Asumiendo que ya tienes una propiedad para inscripciones
  inscripciones: { [alumno: string]: string[] } = {};
  // Define la nueva propiedad para las solicitudes de baja
  solicitudesBaja: { [alumno: string]: string[] } = {};

  constructor(private inscripcionService: InscripcionService, private snackBar: MatSnackBar) { }


  objectKeys = Object.keys;

  ngOnInit(): void {
    this.cargarDatos();
  }

  aprobarBaja(materia: string, alumno: string) {
  this.inscripcionService.aprobarBaja(materia, alumno);
  this.snackBar.open(`Baja de "${materia}" aprobada con éxito para ${alumno}`, 'Cerrar', {
    duration: 3000,
  });
  // Aquí recargar las inscripciones y solicitudes de baja
  this.cargarDatos();
}

   cargarDatos() {
    this.inscripciones = this.inscripcionService.obtenerInscripciones();
    this.solicitudesBaja = this.inscripcionService.obtenerSolicitudesBaja();
  }

  esSolicitudesBajaVacio(): boolean {
  return Object.keys(this.solicitudesBaja).length === 0;
}
}
