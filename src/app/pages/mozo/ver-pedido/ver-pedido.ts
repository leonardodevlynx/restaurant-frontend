import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PedidoService } from '../../../core/services/pedido.service';
import { Pedido } from '../../../models/pedido.model';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-ver-pedido',
  imports: [RouterLink],
  templateUrl: './ver-pedido.html',
  styleUrl: './ver-pedido.css'
})
export class VerPedido implements OnInit {
  protected readonly pedido = signal<Pedido | null>(null);
  protected readonly errorMensaje = signal<string | null>(null);
  protected readonly productos = signal<Producto[]>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.pedidoService.obtenerPedidoPorId(id).subscribe({
      next: (data) => this.pedido.set(data),
      error: (err) => this.errorMensaje.set(err.error?.mensaje ?? 'No se pudo cargar el pedido')
    });
    this.productoService.listarProductosDisponibles().subscribe({
      next: (data) => this.productos.set(data),
      error: () => this.errorMensaje.set('No se pudieron cargar los productos')
    });
  }

  protected agregarProducto(pedidoId: string, productoId: string, cantidadTexto: string): void {
    const cantidad = Number(cantidadTexto);
    if (!Number.isInteger(cantidad) || cantidad < 1) {
      this.errorMensaje.set('La cantidad debe ser un número mayor a 0');
      return;
    }

    this.errorMensaje.set(null);
    this.pedidoService.agregarDetalle(pedidoId, productoId, cantidad).subscribe({
      next: (pedidoActualizado) => this.pedido.set(pedidoActualizado),
      error: (err) => this.errorMensaje.set(err.error?.mensaje ?? 'No se pudo agregar el producto')
    });
  }
  protected avanzarEstado(pedidoId: string): void {
    this.errorMensaje.set(null);
    this.pedidoService.avanzarEstado(pedidoId).subscribe({
      next: (pedidoActualizado) => this.pedido.set(pedidoActualizado),
      error: (err) => this.errorMensaje.set(err.error?.mensaje ?? 'No se pudo avanzar el estado')
    });
  }

  protected cancelarPedido(pedidoId: string): void {
    if (!confirm('¿Seguro que quieres cancelar este pedido?')) return;

    this.errorMensaje.set(null);
    this.pedidoService.cancelarPedido(pedidoId).subscribe({
      next: () => this.router.navigate(['/mozo/mesas']),
      error: (err) => this.errorMensaje.set(err.error?.mensaje ?? 'No se pudo cancelar el pedido')
    });
  }
}