import { Component, OnInit } from '@angular/core';
import { Curso } from '../../../shared/interfaces/curso.model';
import { CursoService } from '../../../core/services/curso.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.scss'
})
export class MateriasComponent implements OnInit {
  cursos: Curso[] = [];

  constructor(private cursoService: CursoService) { }

  ngOnInit() {
    this.cursos = this.cursoService.getCursos();
  }
}
