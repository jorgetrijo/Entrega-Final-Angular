import { Component } from '@angular/core';
import { FormularioService } from '../../core/services/formulario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioActualService } from '../../core/services/usuario-actual-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';
  loading: boolean = false;

  constructor(
    private formularioService: FormularioService,
    private _snackBar: MatSnackBar,
    private usuarioActualService: UsuarioActualService,
    private router: Router
  ) {}

  iniciarSesion() {
    this.loading = true; // Iniciar carga
    // Obtener el usuario de manera asincrónica
    this.formularioService.obtenerUsuario(this.usuario).subscribe(usuario => {
      if (usuario && usuario.contraseña === this.contrasena) {
        this.usuarioActualService.setUsuarioActual(usuario);
        this.mostrarSnackbar('Inicio de sesión exitoso', 'snackbar-success');
        this.router.navigate(['/']);
      } else {
        this.mostrarSnackbar('Usuario o contraseña incorrectos', 'snackbar-error');
      }
      this.loading = false; // Finalizar carga
    }, error => {
      this.mostrarSnackbar('Error al iniciar sesión', 'snackbar-error');
      this.loading = false; // Asegurar que la carga finalice en caso de error
    });
  }

  mostrarSnackbar(mensaje: string, clase: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 2000,
      panelClass: clase
    });
  }

  // Simulamos una carga al hacer login
  iniciarSesionConCarga(): void {
    this.simulateLoading();
    setTimeout(() => {
      this.iniciarSesion();
    }, 2000);
  }

  simulateLoading(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
