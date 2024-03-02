import { Component } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-parciales',
  templateUrl: './parciales.component.html',
  styleUrl: './parciales.component.scss'
})
export class ParcialesComponent {
   parciales = [
  { nombre: 'Química 2', fecha: new Date('2024-02-10') },
  { nombre: 'Historia 2', fecha: new Date('2024-02-27') },
  { nombre: 'Matemática 2', fecha: new Date('2024-02-05') },
  { nombre: 'Química 3', fecha: new Date('2024-03-18') },
  { nombre: 'Física 3', fecha: new Date('2024-03-01') },
  { nombre: 'Física 3', fecha: new Date('2024-03-15') },
  { nombre: 'Inglés 4', fecha: new Date('2024-04-05') },
  { nombre: 'Matemática 4', fecha: new Date('2024-04-23') },
  { nombre: 'Matemática 4', fecha: new Date('2024-04-25') },
  { nombre: 'Química 5', fecha: new Date('2024-05-27') },
  { nombre: 'Física 5', fecha: new Date('2024-05-01') },
  { nombre: 'Inglés 5', fecha: new Date('2024-05-06') },
  { nombre: 'Filosofía 6', fecha: new Date('2024-06-13') },
  { nombre: 'Literatura 6', fecha: new Date('2024-06-05') },
  { nombre: 'Inglés 6', fecha: new Date('2024-06-18') },
  { nombre: 'Física 7', fecha: new Date('2024-07-07') },
  { nombre: 'Geografía 7', fecha: new Date('2024-07-02') },
  { nombre: 'Educación Física 7', fecha: new Date('2024-07-25') },
  { nombre: 'Biología 8', fecha: new Date('2024-08-02') },
  { nombre: 'Educación Física 8', fecha: new Date('2024-08-09') },
  { nombre: 'Física 8', fecha: new Date('2024-08-21') },
  { nombre: 'Literatura 9', fecha: new Date('2024-09-23') },
  { nombre: 'Geografía 9', fecha: new Date('2024-09-07') },
  { nombre: 'Geografía 9', fecha: new Date('2024-09-17') },
  { nombre: 'Inglés 10', fecha: new Date('2024-10-01') },
  { nombre: 'Literatura 10', fecha: new Date('2024-10-20') },
  { nombre: 'Química 10', fecha: new Date('2024-10-18') },
  { nombre: 'Química 11', fecha: new Date('2024-11-25') },
  { nombre: 'Geografía 11', fecha: new Date('2024-11-27') },
  { nombre: 'Física 11', fecha: new Date('2024-11-24') }
];

  currentMonth: Date;
  parcialesDelMes: any[] = [];

  constructor() {
    this.currentMonth = new Date();
    this.filterParciales(this.currentMonth);
  }

  chosenYearHandler(normalizedYear: Date, datepicker: MatDatepicker<Date>) {
    const ctrlValue = this.currentMonth;
    ctrlValue.setFullYear(normalizedYear.getFullYear());
    this.filterParciales(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Date, datepicker: MatDatepicker<Date>) {
    const ctrlValue = this.currentMonth;
    ctrlValue.setMonth(normalizedMonth.getMonth());
    this.filterParciales(ctrlValue);
    datepicker.close();
  }

  onMonthSelected(event:any): void {
    const chosenDate = new Date(event.value);
    this.filterParciales(chosenDate);
  }

  filterParciales(date: Date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    this.parcialesDelMes = this.parciales.filter(p => {
      return p.fecha.getFullYear() === year && p.fecha.getMonth() === month;
    });
  }
}
