import { DetallePedido } from './detalle-pedido.model';
export interface Pedido {
  id: string;
  numeroMesa: number;
  detalles: DetallePedido[];
  estado: string;
  fechaCreacion: string;
  total: number;
  observacion?: string;
}