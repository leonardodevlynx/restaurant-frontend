import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PedidoService } from '../../../core/services/pedido.service';
import { ComprobanteService } from '../../../core/services/comprobante.service';
import { Pedido } from '../../../models/pedido.model';
import { Comprobante } from '../../../models/comprobante.model';
import { Observable } from 'rxjs';
import { ConsultaDocumentoService } from '../../../core/services/consulta-documento.service';
import { DatosCliente } from '../../../models/datos-cliente.model';

@Component({
  selector: 'app-cobrar-pedido',
  imports: [RouterLink],
  templateUrl: './cobrar-pedido.html',
  styleUrl: './cobrar-pedido.css'
})
export class CobrarPedido implements OnInit {
  protected readonly pedido = signal<Pedido | null>(null);
  protected readonly comprobante = signal<Comprobante | null>(null);
  protected readonly tipo = signal<'FACTURA' | 'BOLETA'>('BOLETA');
  protected readonly errorMensaje = signal<string | null>(null);
  protected readonly datosCliente = signal<DatosCliente | null>(null);
  protected readonly buscando = signal(false);

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private comprobanteService: ComprobanteService,
    private consultaService: ConsultaDocumentoService

  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.pedidoService.obtenerPedidoPorId(id).subscribe({
      next: (data) => this.pedido.set(data),
      error: (err) => this.errorMensaje.set(err.error?.mensaje ?? 'No se pudo cargar el pedido')
    });
  }

  protected emitir(pedidoId: string, ruc: string, razon: string, dni: string): void {
    const tipoActual = this.tipo();

    if (tipoActual === 'FACTURA' && ruc.trim().length !== 11) {
      this.errorMensaje.set('El RUC debe tener 11 dígitos');
      return;
    }
    if (tipoActual === 'BOLETA' && dni.trim() && dni.trim().length !== 8) {
      this.errorMensaje.set('El DNI debe tener 8 dígitos');
      return;
    }

    this.errorMensaje.set(null);
    this.comprobanteService.emitirComprobante(
      pedidoId,
      tipoActual,
      ruc.trim() || undefined,
      razon.trim() || undefined,
      dni.trim() || undefined
    ).subscribe({
      next: (c) => this.comprobante.set(c),
      error: (err) => this.errorMensaje.set(err.error?.mensaje ?? 'No se pudo emitir el comprobante')
    });
  }

  protected cambiarTipo(t: 'FACTURA' | 'BOLETA'): void {
    this.tipo.set(t);
    this.datosCliente.set(null);
    this.errorMensaje.set(null);
  }

  protected buscarRuc(ruc: string): void {
    this.buscar(this.consultaService.consultarRuc(ruc.trim()));
  }

  protected buscarDni(dni: string): void {
    this.buscar(this.consultaService.consultarDni(dni.trim()));
  }

  private buscar(consulta: Observable<DatosCliente>): void {
    this.errorMensaje.set(null);
    this.datosCliente.set(null);
    this.buscando.set(true);
    consulta.subscribe({
      next: (d) => {
        this.datosCliente.set(d);
        this.buscando.set(false);
      },
      error: (err) => {
        this.errorMensaje.set(err.error?.mensaje ?? 'No se pudo consultar el documento');
        this.buscando.set(false);
      }
    });
  }
}