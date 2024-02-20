import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Usuario } from '../../interfaces/usuario.interface';
import { Subscription } from 'rxjs';
import { UsuarioActualService } from '../../../core/services/usuario-actual-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnDestroy {
  usuarioActual: Usuario | null = null;
  usuarioSubscription: Subscription;

  constructor(private usuarioActualService: UsuarioActualService, private router: Router) {
    this.usuarioSubscription = this.usuarioActualService.usuarioActual$.subscribe(usuario => {
      this.usuarioActual = usuario;
    });
  }

  ngOnDestroy() {
    this.usuarioSubscription.unsubscribe();
  }

  cerrarSesion() {
    this.usuarioActualService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
