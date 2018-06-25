import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../base";
import { ProductoComponent } from "./producto.component";
import { CreateProductoComponent } from "./create";
const routes: Routes = [
  { path: '', component: ProductoComponent },
  { path: 'nuevo', component: CreateProductoComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: CreateProductoComponent, canActivate: [AuthGuard] },
];
export const routingProducto: ModuleWithProviders = RouterModule.forChild(routes);