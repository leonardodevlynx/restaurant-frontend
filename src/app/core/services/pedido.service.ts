import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private readonly apiUrl = 'http://localhost:8080/api/pedidos';
  constructor(private http: HttpClient) {}

  listarPedidosActivos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/activos`);
  }

  crearPedido(mesaId: string, observacion?: string): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, { mesaId, observacion });
  }

  obtenerPedidoPorId(id: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  agregarDetalle(pedidoId: string, productoId: string, cantidad: number, observacion?: string): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}/${pedidoId}/detalles`, {
      productoId,
      cantidad,
      observacion
    });
  }

  avanzarEstado(pedidoId: string): Observable<Pedido> {
    return this.http.patch<Pedido>(`${this.apiUrl}/${pedidoId}/avanzar-estado`, {});
  }

  cancelarPedido(pedidoId: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${pedidoId}/cancelar`, {});
  }
}