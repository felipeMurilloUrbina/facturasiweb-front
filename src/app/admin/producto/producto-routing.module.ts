import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ProductoComponent, CreateProductoComponent } from ".";
import { AuthGuard } from "../../base";
const routes: Routes = [
  { path: '', component: ProductoComponent },
  { path: 'nuevo', component: CreateProductoComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: CreateProductoComponent, canActivate: [AuthGuard] },
];
export const routingProducto: ModuleWithProviders = RouterModule.forChild(routes);