import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mesa } from '../../models/mesa.model';

@Injectable({
  providedIn: 'root'
})
export class MesaService {
  private readonly apiUrl = 'http://localhost:8080/api/mesas';

  constructor(private http: HttpClient) {}

  listarMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(this.apiUrl);
  }

  obtenerMesaPorId(id: string): Observable<Mesa> {
    return this.http.get<Mesa>(`${this.apiUrl}/${id}`);
  }

  crearMesa(mesa: { numero: number; capacidad: number }): Observable<Mesa> {
    return this.http.post<Mesa>(this.apiUrl, mesa);
  }

  listarMesasDisponibles(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.apiUrl}/disponibles`);
  }

  actualizarEstadoMesa(id: string, estado: string): Observable<Mesa> {
    return this.http.patch<Mesa>(`${this.apiUrl}/${id}/estado?estado=${estado}`, {});
  }
}