export interface DatosCliente {
  documento: string;
  nombre: string;
  direccion?: string;   // opcional: el backend manda null en consultas por DNI
}