import { Component } from '@angular/core';
import { FormularioService } from '../../core/services/formulario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioActualService } from '../../core/services/usuario-actual-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';

  constructor(
    private formularioService: FormularioService,
    private _snackBar: MatSnackBar,
    private usuarioActualService: UsuarioActualService
  ) {}

  iniciarSesion() {
    const usuario = this.formularioService.obtenerUsuario(this.usuario);
    if (usuario && usuario.contraseña === this.contrasena) {
       this.usuarioActualService.setUsuarioActual(usuario);
       this.mostrarSnackbar('Inicio de sesión exitoso', 'snackbar-success');
    } else {
      this.mostrarSnackbar('Usuario o contraseña incorrectos', 'snackbar-error');
    }
  }

  mostrarSnackbar(mensaje: string, clase: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 2000,
      panelClass: clase
    });
  }

  loading: boolean = false;

  //Simulamos una carga al hacer login
  simulateLoading(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  iniciarSesionConCarga(): void {
  this.simulateLoading();
  setTimeout(() => {
    this.iniciarSesion();
  }, 2000);
}
}
