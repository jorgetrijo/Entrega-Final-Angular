import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { NombreCompletoPipe } from '../shared/pipes/nombre-completo.pipe';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AuthComponent, RegisterComponent, LoginComponent, UsersComponent, NombreCompletoPipe],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, FormsModule, RouterModule],
  exports: [AuthComponent]
})
export class AuthModule { }
