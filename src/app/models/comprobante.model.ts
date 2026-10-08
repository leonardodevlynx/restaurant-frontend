export interface Comprobante {
  id: string;
  tipo: 'FACTURA' | 'BOLETA';
  serie: string;
  numero: number;
  rucCliente?: string;
  razonSocialCliente?: string;
  dniCliente?: string;
  valorVenta: number;
  igv: number;
  total: number;
  estado: 'PENDIENTE_ENVIO' | 'ENVIADO' | 'ACEPTADO' | 'RECHAZADO' | 'EXCEPCION' | 'GUARDADO_OFFLINE';
  fechaEmision: string;
}