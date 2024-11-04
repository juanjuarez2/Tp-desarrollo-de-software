import { Tema } from './tema';
import { Docente } from './docente';
import { Alumno } from './alumno';

export interface Curso {
  id: number;
  tema: Tema;
  fechaInicio: Date;
  fechaFin: Date;
  docente: Docente;
  precio: number;
  alumnos: Alumno[];
}
/*
export class Curso {

  constructor() {
      this.tema = '';
      this.fechaInicio = new Date();
      this.fechaFin = new Date();
      this.docente = ;
      this.precio = 0;
      this.alumnos = [];
  }

  tema: Tema;
  fechaInicio: Date;
  fechaFin: Date;
  docente: Docente;
  precio: number;
  alumnos: Alumno[];
}
*/