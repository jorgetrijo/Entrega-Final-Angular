import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { FormularioService } from '../../core/services/formulario.service';
import { UsuarioActualService } from '../../core/services/usuario-actual-service';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let formularioService: jasmine.SpyObj<FormularioService>;
  let usuarioActualService: jasmine.SpyObj<UsuarioActualService>;

  beforeEach(async () => {
    const formularioServiceSpy = jasmine.createSpyObj('FormularioService', ['obtenerUsuario']);
    const usuarioActualServiceSpy = jasmine.createSpyObj('UsuarioActualService', ['setUsuarioActual', 'cerrarSesion']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        { provide: FormularioService, useValue: formularioServiceSpy },
        { provide: UsuarioActualService, useValue: usuarioActualServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    formularioService = TestBed.inject(FormularioService) as jasmine.SpyObj<FormularioService>;
    usuarioActualService = TestBed.inject(UsuarioActualService) as jasmine.SpyObj<UsuarioActualService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe iniciar sesión exitosamente', () => {
    const usuarioMock = { usuario: 'test', contraseña: '1234', nombre: 'Test', apellido: 'User' };
    formularioService.obtenerUsuario.and.returnValue(of(usuarioMock));

    component.usuario = 'test';
    component.contrasena = '1234';
    component.iniciarSesion();

    expect(formularioService.obtenerUsuario).toHaveBeenCalledWith('test');
    expect(usuarioActualService.setUsuarioActual).toHaveBeenCalledWith(usuarioMock);
  });

  it('debe mostrar un error si el inicio de sesión falla', () => {
    formularioService.obtenerUsuario.and.returnValue(of(undefined)); // Simula un usuario no encontrado
    spyOn(component, 'mostrarSnackbar');

    component.usuario = 'wrong';
    component.contrasena = 'user';
    component.iniciarSesion();

    expect(component.mostrarSnackbar).toHaveBeenCalledWith('Usuario o contraseña incorrectos', 'snackbar-error');
  });

  it('debe manejar errores de red al intentar iniciar sesión', () => {
    formularioService.obtenerUsuario.and.returnValue(throwError(() => new Error('Error de red')));
    spyOn(component, 'mostrarSnackbar');

    component.iniciarSesion();

    expect(component.mostrarSnackbar).toHaveBeenCalledWith('Error al iniciar sesión', 'snackbar-error');
  });
});
