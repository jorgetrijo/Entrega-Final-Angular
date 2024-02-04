import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';



@Pipe({
  name: 'nombreCompleto',
})
export class NombreCompletoPipe implements PipeTransform {
  transform(usuario: Usuario | null): string {
    if (usuario) {
      return `${usuario.nombre} ${usuario.apellido}`;
    } else {
      return '';
    }
  }
}
