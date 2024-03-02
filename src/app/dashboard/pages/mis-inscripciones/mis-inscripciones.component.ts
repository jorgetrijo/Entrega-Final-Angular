import { Component, OnInit } from '@angular/core';
import { UsuarioActualService } from '../../../core/services/usuario-actual-service';
import { InscripcionService } from '../../../core/services/inscripcion.service';
import { Usuario } from '../../../shared/interfaces/usuario.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mis-inscripciones',
  templateUrl: './mis-inscripciones.component.html',
  styleUrl: './mis-inscripciones.component.scss'
})
export class MisInscripcionesComponent implements OnInit {
  usuarioActual: Usuario | null = null;
  inscripciones: string[] = [];

  constructor(
    private usuarioActualService: UsuarioActualService,
    private inscripcionService: InscripcionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.usuarioActualService.usuarioActual$.subscribe(usuario => {
      this.usuarioActual = usuario;
      if (usuario?.nombre) {
        this.inscripciones = this.inscripcionService.obtenerInscripcionesPorAlumno(usuario.nombre);
      }
    });
  }

  darseDeBaja(materia: string) {
  if (this.usuarioActual?.nombre) {
    this.inscripcionService.solicitarBaja(materia, this.usuarioActual.nombre);
    this.snackBar.open(`Solicitud de baja enviada para ${materia}`, 'Cerrar', { duration: 3000 });
  }


  }
}
