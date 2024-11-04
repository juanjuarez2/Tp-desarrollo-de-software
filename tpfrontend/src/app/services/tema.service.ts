import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tema } from '../models/tema';


@Injectable({
  providedIn: 'root',
})
export class TemaService {
  private apiUrl = 'http://localhost:8080/api/v1/tema';
  private apiUrl2 = 'http://localhost:8080/api/v1/temas';

  constructor(private http: HttpClient) {}


  // Obtener todos los docentes
  getAll(): Observable<Tema[]> {
    return this.http.get<Tema[]>(this.apiUrl2);
  }

  // Obtener un docente por ID
  getById(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo docente
  create(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>(this.apiUrl, tema);
  }

  // Actualizar docente
  update(id: number, tema: Tema): Observable<Tema> {
    return this.http.put<Tema>(`${this.apiUrl}/${id}`, tema);
  }

  // Eliminar docente
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
