import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UsersComponent } from './auth/users/users.component';
import { HomePageComponent } from './shared/components/home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { ParcialesComponent } from './dashboard/pages/parciales/parciales.component';
import { MateriasComponent } from './dashboard/pages/materias/materias.component';
import { InscripcionesComponent } from './dashboard/pages/inscripciones/inscripciones.component';
import { MisInscripcionesComponent } from './dashboard/pages/mis-inscripciones/mis-inscripciones.component';
import { VerInscripcionesComponent } from './dashboard/pages/ver-inscripciones/ver-inscripciones.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'parciales', component: ParcialesComponent, canActivate: [AuthGuard] },
  { path: 'materias', component: MateriasComponent, canActivate: [AuthGuard] },
  { path: 'inscripcion', component: InscripcionesComponent, canActivate: [AuthGuard] },
  { path: 'mis-inscripcion', component: MisInscripcionesComponent, canActivate: [AuthGuard] },
  { path: 'ver-inscripcion', component: VerInscripcionesComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard, AdminGuard]  },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard]  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
