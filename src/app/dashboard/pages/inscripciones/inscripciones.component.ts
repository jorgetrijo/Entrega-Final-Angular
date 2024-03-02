import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { InscripcionService } from '../../../core/services/inscripcion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../../shared/interfaces/usuario.interface';
import { UsuarioActualService } from '../../../core/services/usuario-actual-service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent implements OnInit {
  inscripcionForm: FormGroup;
  materias = ['Matemáticas', 'Historia', 'Literatura', 'Química', 'Física', 'Biología'];
  usuarioActual: Usuario | null = null;

  constructor(
    private inscripcionService: InscripcionService,
    private usuarioActualService: UsuarioActualService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.inscripcionForm = this.fb.group({
      materiasSeleccionadas: ['']
    });
  }

  ngOnInit() {
    this.usuarioActualService.usuarioActual$.subscribe(usuario => {
      this.usuarioActual = usuario;
    });
  }

  inscribir() {
  const materiasSeleccionadas = this.inscripcionForm.get('materiasSeleccionadas')!.value;
  if (materiasSeleccionadas && materiasSeleccionadas.length > 0 && this.usuarioActual?.nombre) {
    const materiasYaInscritas = this.inscripcionService.inscribirAlumno(materiasSeleccionadas, this.usuarioActual.nombre);

    if (materiasYaInscritas.length > 0) {
      // El alumno ya estaba inscrito en alguna de las materias seleccionadas
      this.snackBar.open(`Ya estás inscrito en: ${materiasYaInscritas.join(', ')}`, 'Cerrar', {
        duration: 5000,
      });
    } else {
      // Inscripción realizada con éxito a nuevas materias
      this.snackBar.open('Inscripción realizada con éxito', 'Cerrar', {
        duration: 3000,
      });
    }

    this.inscripcionForm.reset();
  } else {
    // Maneja la falta de selección o la falta de usuario actual
    this.snackBar.open('Por favor, selecciona al menos una materia o inicia sesión', 'Cerrar', {
      duration: 3000,
    });
  }
}
}
