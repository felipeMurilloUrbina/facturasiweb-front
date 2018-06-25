import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../base';
import { AlmacenComponent } from './almacen.component';
import { CreateAlmacenComponent } from './create';
const routes: Routes = [
  { path: '', component: AlmacenComponent },
  { path: 'nuevo', component: CreateAlmacenComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: CreateAlmacenComponent, canActivate: [AuthGuard] },
];
export const routingAlmacen: ModuleWithProviders = RouterModule.forChild(routes);
export class AlmacenRoutingModule { }
