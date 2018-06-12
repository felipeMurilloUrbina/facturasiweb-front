import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AlmacenComponent, CreateAlmacenComponent } from ".";
import { AuthGuard } from "../../base";
const routes: Routes = [
  { path: '', component: AlmacenComponent },
  { path: 'almacenes/nuevo', component: CreateAlmacenComponent, canActivate: [AuthGuard] },
  { path: 'almacenes/editar/:id', component: CreateAlmacenComponent, canActivate: [AuthGuard] },
];
export const routingAlmacen: ModuleWithProviders = RouterModule.forChild(routes);
// @NgModule({
//   imports: [
//     RouterModule.forChild([
//       {
//         path: 'admin', canActivate: [AuthGuard], component: AdminComponent,
//         children: [
//           { path: '', redirectTo: 'dashboard', canActivate: [AuthGuard],  pathMatch: 'full' },
//           { path: 'dashboard', component: DashboardComponent },
//           { path: 'perfil',  component: PerfilComponent },
//           { path: 'almacenes', component: AlmacenComponent, canActivate: [AuthGuard] },
          
//           { path: 'usuarios', component: UsuarioComponent, canActivate: [AuthGuard] },
//           { path: 'usuarios/nuevo', component: CreateUsuarioComponent, canActivate: [AuthGuard] },
//           { path: 'clientes', component: ClienteComponent, canActivate: [AuthGuard] },
//           { path: 'clientes/nuevo', component: CreateClienteComponent, canActivate: [AuthGuard] },
//           { path: 'clientes/editar/:id', component: CreateClienteComponent, canActivate: [AuthGuard] },
//           { path: 'cotizaciones', component: CotizacionComponent, canActivate: [AuthGuard] },
//           { path: 'cotizaciones/editar/:id', component: CreateCotizacionComponent, canActivate: [AuthGuard] },
//           { path: 'cotizaciones/nuevo', component: CreateCotizacionComponent, canActivate: [AuthGuard] },
//           { path: 'lineas', component: LineaComponent, canActivate: [AuthGuard] },
//           { path: 'lineas/nuevo', component: CreateLineaComponent, canActivate: [AuthGuard] },
//           { path: 'lineas/editar/:id', component: CreateLineaComponent, canActivate: [AuthGuard] },
//           { path: 'proveedores', component: ProveedorComponent, canActivate: [AuthGuard] },
//           { path: 'proveedores/nuevo', component: CreateProveedorComponent, canActivate: [AuthGuard] },
//           { path: 'proveedores/editar/:id', component: CreateProveedorComponent, canActivate: [AuthGuard] },
//           { path: 'productos', component: ProductoComponent, canActivate: [AuthGuard] },
//           { path: 'productos/nuevo', component: CreateProductoComponent, canActivate: [AuthGuard] },
//           { path: 'productos/editar/:id', component: CreateProductoComponent, canActivate: [AuthGuard] },
//           { path: 'equipos', component: EquipoComponent, canActivate: [AuthGuard] },
//           { path: 'equipos/nuevo', component: CreateEquipoComponent, canActivate: [AuthGuard] },
//           { path: 'equipos/editar/:id', component: CreateEquipoComponent, canActivate: [AuthGuard] },
//           { path: 'servicios/nuevo/:equipoId', component: CreateServicioComponent, canActivate: [AuthGuard] },
//           { path: 'servicios/editar/:id', component: CreateServicioComponent, canActivate: [AuthGuard] },
//           { path: 'servicios', component: ServicioComponent, canActivate: [AuthGuard] },
//           { path: 'sucursales', component: SucursalComponent, canActivate: [AuthGuard] },
//           { path: 'sucursales/nuevo', component: CreateSucursalComponent, canActivate: [AuthGuard] },
//           { path: 'sucursales/editar/:id', component: CreateSucursalComponent, canActivate: [AuthGuard] },
//           { path: 'facturas', component: FacturaComponent, canActivate: [AuthGuard] },
//           { path: 'turnos', component: TurnoComponent, canActivate: [AuthGuard] },
//           { path: 'turnos/nuevo', component: NuevoTurnoComponent, canActivate: [AuthGuard] },
//           { path: 'turnos/abrir-caja/:id', component: SeleccionarTurnoComponent, canActivate: [AuthGuard] },
//           { path: 'cajas', component: CajaComponent, canActivate: [AuthGuard] },
//           { path: 'cajas/nueva', component: NuevaCajaComponent, canActivate: [AuthGuard] },
//           { path: 'ventas', component: VentasDelDiaComponent, canActivate: [AuthGuard] },
//           { path: 'punto-venta/:turnoId', component: PuntoVentaComponent, canActivate: [AuthGuard] },
//           { path: 'facturas/nuevo', component: CreateFacturaComponent, canActivate: [AuthGuard] },
//           { path: 'facturas/nuevo/:servicioId', component: CreateFacturaComponent, canActivate: [AuthGuard] },
//           { path: 'reportes/clientes', component: ReporteClienteComponent, canActivate: [AuthGuard] },
//           { path: 'reportes/equipos', component: ReporteEquipoComponent, canActivate: [AuthGuard] },
//           { path: 'reportes/facturas', component: ReporteFacturaComponent, canActivate: [AuthGuard] },
//           { path: 'reportes/productos', component: ReporteProductoComponent, canActivate: [AuthGuard] },
//           { path: 'reportes/servicios', component: ReporteServicioComponent, canActivate: [AuthGuard] },
//           { path: 'cliente-servicios/ver/:id', component: CreateClienteServicioComponent, canActivate: [AuthGuard] },
//           { path: 'cliente-equipos', component: ClienteEquipoComponent, canActivate: [AuthGuard] },
//           { path: 'cliente-equipos/ver/:id', component: CreateClienteEquipoComponent, canActivate: [AuthGuard] },
//           { path: 'tipos-movimientos', component: TipoMovimientoComponent, canActivate: [AuthGuard] },
//           { path: 'tipos-movimientos/nuevo', component: CreateTipoMovimientoComponent, canActivate: [AuthGuard] },
//           { path: 'tipos-movimientos/editar/:id', component: CreateTipoMovimientoComponent, canActivate: [AuthGuard] }
//         ]
//       },
//       { path: '**', redirectTo: 'login' }
//     ])
//   ],
//   exports: [
//     RouterModule
//   ]
// })
export class AlmacenRoutingModule { }
