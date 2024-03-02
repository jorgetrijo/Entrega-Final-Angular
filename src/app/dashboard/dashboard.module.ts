import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { MontosPipe } from '../shared/pipes/montos.pipe';
import { ParcialesComponent } from './pages/parciales/parciales.component';
import { MateriasComponent } from './pages/materias/materias.component';
import { InscripcionesComponent } from './pages/inscripciones/inscripciones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MisInscripcionesComponent } from './pages/mis-inscripciones/mis-inscripciones.component';
import { VerInscripcionesComponent } from './pages/ver-inscripciones/ver-inscripciones.component';




@NgModule({
  declarations: [DashboardComponent, ParcialesComponent, MateriasComponent, InscripcionesComponent, MisInscripcionesComponent, VerInscripcionesComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  exports: [DashboardComponent, ParcialesComponent]
})
export class DashboardModule { }
