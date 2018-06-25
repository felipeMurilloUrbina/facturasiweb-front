import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../base";
import { UsuarioComponent } from "./usuario.component";
import { CreateUsuarioComponent } from "./create";
const routes: Routes = [
  { path: '', component: UsuarioComponent },
  { path: 'nuevo', component: CreateUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: CreateUsuarioComponent, canActivate: [AuthGuard] },
];
export const routingUsuario: ModuleWithProviders = RouterModule.forChild(routes);