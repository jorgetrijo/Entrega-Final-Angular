import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  noticias = [
    {
      title: 'Inicio del año escolar',
      image: 'https://via.placeholder.com/300',
      content: 'El año escolar ha comenzado con gran entusiasmo por parte de estudiantes y profesores.'
    },
    {
      title: 'Excursión al Museo de Ciencias Naturales',
      image: 'https://via.placeholder.com/300',
      content: 'Los estudiantes de secundaria realizaron una emocionante visita al museo.'
    },
    {
      title: 'Concurso de Matemáticas',
      image: 'https://via.placeholder.com/300',
      content: 'El concurso de matemáticas se llevará a cabo el próximo viernes en el gimnasio del colegio.'
    },
    {
      title: 'Celebración del Día del Estudiante',
      image: 'https://via.placeholder.com/300',
      content: 'El Día del Estudiante será celebrado con una serie de actividades y concursos.'
    }
  ];

  importe:number = 5000.6

}
