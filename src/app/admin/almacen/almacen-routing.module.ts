import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlmacenComponent, CreateAlmacenComponent } from '.';
import { AuthGuard } from '../../base';
const routes: Routes = [
  { path: '', component: AlmacenComponent },
  { path: 'nuevo', component: CreateAlmacenComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: CreateAlmacenComponent, canActivate: [AuthGuard] },
];
export const routingAlmacen: ModuleWithProviders = RouterModule.forChild(routes);
export class AlmacenRoutingModule { }
