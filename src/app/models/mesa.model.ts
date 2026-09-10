export interface Mesa {
  id: string;
  numero: number;
  capacidad: number;
  estado: 'DISPONIBLE' | 'OCUPADA' | 'RESERVADA';
}