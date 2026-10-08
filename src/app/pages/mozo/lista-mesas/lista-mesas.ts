import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MesaService } from '../../../core/services/mesa.service';
import { PedidoService } from '../../../core/services/pedido.service';
import { Mesa } from '../../../models/mesa.model';
import { Pedido } from '../../../models/pedido.model';

@Component({
  selector: 'app-lista-mesas',
  imports: [RouterLink],
  templateUrl: './lista-mesas.html',
  styleUrl: './lista-mesas.css'
})
export class ListaMesas implements OnInit {
  protected readonly pedidosActivos = signal<Pedido[]>([]);
  protected readonly mesas = signal<Mesa[]>([]);
  protected readonly errorMensaje = signal<string | null>(null);

  constructor(
    private mesaService: MesaService,
    private pedidoService: PedidoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mesaService.listarMesas().subscribe({
      next: (data) => this.mesas.set(data),
      error: (err) => console.error('Error al cargar mesas:', err)
    });
    this.pedidoService.listarPedidosActivos().subscribe({
      next: (data) => this.pedidosActivos.set(data),
      error: (err) => console.error('Error al cargar pedidos activos:', err)
    });
  }

  protected crearPedido(mesaId: string): void {
    if (!confirm('¿Abrir un pedido en esta mesa?')) return;
    this.errorMensaje.set(null);
    this.pedidoService.crearPedido(mesaId).subscribe({
      next: (pedido) => this.router.navigate(['/mozo/pedidos', pedido.id]),
      error: (err) => {
        // err.error es el ErrorResponse del backend (codigo, mensaje, ...)
        this.errorMensaje.set(err.error?.mensaje ?? 'No se pudo crear el pedido');
      }
    });
  }
  protected pedidoIdDeMesa(numeroMesa: number): string | undefined {
    return this.pedidosActivos().find(p => p.numeroMesa === numeroMesa)?.id;
  }
}