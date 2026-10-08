import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PedidoService } from '../../../core/services/pedido.service';
import { Pedido } from '../../../models/pedido.model';

@Component({
  selector: 'app-lista-por-pagar',
  imports: [RouterLink],
  templateUrl: './lista-por-pagar.html',
  styleUrl: './lista-por-pagar.css'
})
export class ListaPorPagar implements OnInit {
  protected readonly pedidos = signal<Pedido[]>([]);
  protected readonly errorMensaje = signal<string | null>(null);

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.pedidoService.listarPedidosActivos().subscribe({
      next: (data) => this.pedidos.set(data.filter(p => p.estado === 'POR_PAGAR')),
      error: (err) => this.errorMensaje.set(err.error?.mensaje ?? 'No se pudieron cargar los pedidos')
    });
  }
}