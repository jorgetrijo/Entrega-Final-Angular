import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../shared/interfaces/usuario.interface';
import { FormularioService } from '../../core/services/formulario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  usuariosRegistrados = new MatTableDataSource<Usuario>();
  columnas: string[] = [
    'nombreCompleto',
    'usuario',
    'email',
    'direccion',
    'ciudad',
    'rol',
    'acciones'
  ];

  constructor(
    private formularioService: FormularioService,
    private snackBar: MatSnackBar,
  ) {};

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.formularioService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        this.usuariosRegistrados.data = usuarios;
      },
      error: (error) => {
        this.mostrarSnackBar('Error al cargar los usuarios', 'snackbar-error');
        console.error('Error al obtener usuarios', error);
      }
    });
  }

  eliminarRegistro(usuarioId: number) {
    this.formularioService.eliminarUsuario(usuarioId).subscribe({
      next: () => {
        this.mostrarSnackBar('Usuario eliminado con éxito', 'snackbar-delete');
        this.cargarUsuarios(); // Refresca la lista de usuarios
      },
      error: (error) => {
        this.mostrarSnackBar('Error al eliminar el usuario', 'snackbar-error');
        console.error('Error al eliminar usuario', error);
      }
    });
  }

  mostrarSnackBar(mensaje: string, clase: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      panelClass: [clase],
    });
  }
}
