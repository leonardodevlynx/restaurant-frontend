export interface DetallePedido {
  id: string;
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  observacion?: string;
}