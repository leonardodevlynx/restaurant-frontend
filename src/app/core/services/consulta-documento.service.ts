import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosCliente } from '../../models/datos-cliente.model';

@Injectable({ providedIn: 'root' })
export class ConsultaDocumentoService {
  private apiUrl = 'http://localhost:8080/api/consultas';

  constructor(private http: HttpClient) {}

  consultarDni(dni: string): Observable<DatosCliente> {
    return this.http.get<DatosCliente>(`${this.apiUrl}/dni/${dni}`);
  }

  consultarRuc(ruc: string): Observable<DatosCliente> {
    return this.http.get<DatosCliente>(`${this.apiUrl}/ruc/${ruc}`);
  }
}