import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

const API_URL = 'http://localhost:8080/api/v1/alumnos';  // URL de tu API

@Injectable({
  providedIn: 'root',
})

export class AlumnoService {

  
  private apiUrl = 'http://localhost:8080/api/v1/alumno';
  private apiUrl2 = 'http://localhost:8080/api/v1/alumnos';
  constructor(private http: HttpClient) {}

  // Obtener todos los docentes
  getAll(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl2);
  }

  // Obtener un docente por ID
  getById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo docente
  create(tema: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrl, tema);
  }

  // Actualizar docente
  update(id: number, tema: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.apiUrl}/${id}`, tema);
  }

  // Eliminar docente
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  } 
}
