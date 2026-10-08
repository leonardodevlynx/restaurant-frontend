import { Routes } from '@angular/router';
import { ListaMesas } from './pages/mozo/lista-mesas/lista-mesas';
import { VerPedido } from './pages/mozo/ver-pedido/ver-pedido';
import { ListaPorPagar } from './pages/caja/lista-por-pagar/lista-por-pagar';
import { CobrarPedido } from './pages/caja/cobrar-pedido/cobrar-pedido';

export const routes: Routes = [
  { path: '', redirectTo: 'mozo/mesas', pathMatch: 'full' },
  { path: 'mozo/mesas', component: ListaMesas },
  { path: 'mozo/pedidos/:id', component: VerPedido },
  { path: 'caja/pedidos', component: ListaPorPagar },
  { path: 'caja/pedidos/:id/cobrar', component: CobrarPedido }
];