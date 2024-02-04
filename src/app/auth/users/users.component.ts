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
    'acciones',
  ];

  constructor(
    private formularioService: FormularioService,
    private snackBar: MatSnackBar,
  ) {};


  ngOnInit() {
    this.formularioService.usuariosRegistrados$.subscribe((usuarios) => {
      this.usuariosRegistrados.data = usuarios;
    });
  }
  eliminarRegistro(element: Usuario) {
    this.formularioService.eliminarUsuario(element);

    // Muestra el snackbar de éxito al eliminar un registro
    this.snackBar.open('Usuario eliminado con éxito', 'Cerrar', {
      duration: 5000,
      panelClass: ['snackbar-delete'],
    });
  }
}
