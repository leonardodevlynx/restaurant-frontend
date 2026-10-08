import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comprobante } from '../../models/comprobante.model';

type TipoComprobante = 'FACTURA' | 'BOLETA' | 'NOTA_CREDITO' | 'NOTA_DEBITO';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {
  private readonly apiUrl = 'http://localhost:8080/api/comprobantes';

  constructor(private http: HttpClient) {}

  emitirComprobante(
    pedidoId: string,
    tipo: TipoComprobante,
    rucCliente?: string,
    razonSocialCliente?: string,
    dniCliente?: string
  ): Observable<Comprobante> {
    return this.http.post<Comprobante>(this.apiUrl, {
      pedidoId,
      tipo,
      rucCliente,
      razonSocialCliente,
      dniCliente
    });
  }

  obtenerComprobantePorId(id: string): Observable<Comprobante> {
    return this.http.get<Comprobante>(`${this.apiUrl}/${id}`);
  }

  reenviarComprobante(id: string): Observable<Comprobante> {
    return this.http.post<Comprobante>(`${this.apiUrl}/${id}/reenviar`, {});
  }
}