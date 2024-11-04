import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docente } from '../models/docente';

const API_URL = 'http://localhost:8080/api/v1/docente';
const API_URL2 = 'http://localhost:8080/api/v1/docentes';

@Injectable({
  providedIn: 'root',
})
export class DocenteService {
  constructor(private http: HttpClient) {}

  // Obtener todos los docentes
  getAll(): Observable<Docente[]> {
    return this.http.get<Docente[]>(`${API_URL2}`);  // si no probar con (API_URL)
  }

  // Obtener un docente por ID
  getById(id: number): Observable<Docente> {
    return this.http.get<Docente>(`${API_URL}/${id}`);
  }

  // Crear nuevo docente
  create(docente: Docente): Observable<Docente> {
    return this.http.post<Docente>(API_URL, docente);
  }

  // Actualizar docente
  update(id: number, docente: Docente): Observable<Docente> {
    return this.http.put<Docente>(`${API_URL}/${id}`, docente);
  }

  // Eliminar docente
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
