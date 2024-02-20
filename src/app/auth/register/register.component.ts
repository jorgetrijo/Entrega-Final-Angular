import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FormularioService } from '../../core/services/formulario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Usuario } from '../../shared/interfaces/usuario.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  mensajeError: string | null = null;
  hide = true;
  datosPersonales: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', Validators.required],
    usuario: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contraseña: ['', [Validators.required, Validators.minLength(6)]],
  });

  ubicacion: FormGroup = this.fb.group({
    direccion: ['', Validators.required],
    ciudad: ['', Validators.required],
  });

  isLinear = true;
  columnas: string[] = ['nombreCompleto', 'usuario', 'email', 'direccion', 'ciudad', 'acciones'];
  usuariosRegistrados = new MatTableDataSource<Usuario>();

  constructor(
    private fb: FormBuilder,
    private formularioService: FormularioService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.actualizarListaUsuarios();
  }

  actualizarListaUsuarios() {
    this.formularioService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        this.usuariosRegistrados.data = usuarios;
      },
      error: (error) => {
        this.mostrarSnackBarError('Error al obtener la lista de usuarios');
        console.error('Error al obtener usuarios', error);
      }
    });
  }

guardarInformacionEnServicio(stepper: MatStepper) {
  const usuario: Usuario = {
    ...this.datosPersonales.value,
    ...this.ubicacion.value
  };

  this.formularioService.obtenerUsuarios().subscribe(usuarios => {
    const existe = usuarios.some(u => u.usuario === usuario.usuario || u.email === usuario.email);
    if (existe) {
      this.mensajeError = 'Usuario y/o email ya existen. Elija otros datos.'; // Establecer el mensaje de error
      this.mostrarSnackBarError(this.mensajeError);
      stepper.selectedIndex = 0; // Si es necesario, vuelve al primer paso
    } else {
      this.formularioService.agregarUsuario(usuario).subscribe({
        next: () => {
          this.mostrarSnackBarSuccess('Usuario creado con éxito');
          this.datosPersonales.reset();
          this.ubicacion.reset();
          this.actualizarListaUsuarios(); // Actualiza la lista de usuarios
          stepper.reset();
          this.mensajeError = null; // Limpiar el mensaje de error
        },
        error: (error) => {
          this.mostrarSnackBarError('Error al crear el usuario');
          console.error('Error al agregar usuario', error);
          this.mensajeError = 'Error al crear el usuario'; // Opcional: establecer un mensaje de error
        }
      });
    }
  });
}

  eliminarRegistro(usuarioId: number) {
    this.formularioService.eliminarUsuario(usuarioId).subscribe({
      next: () => {
        this.mostrarSnackBarSuccess('Usuario eliminado con éxito');
        this.actualizarListaUsuarios(); // Actualiza la lista de usuarios
      },
      error: (error) => {
        this.mostrarSnackBarError('Error al eliminar el usuario');
        console.error('Error al eliminar usuario', error);
      }
    });
  }

  mostrarSnackBarSuccess(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      panelClass: ['snackbar-success'],
    });
  }

  mostrarSnackBarError(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      panelClass: ['snackbar-error'],
    });
  }
}
