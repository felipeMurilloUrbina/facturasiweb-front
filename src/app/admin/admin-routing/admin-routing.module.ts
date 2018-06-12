import { DashboardComponent } from './../dashboard/dashboard.component';
import { ClienteComponent, CreateClienteComponent } from '../cliente';
import { ProductoComponent, CreateProductoComponent } from '../producto';
import { SucursalComponent, CreateSucursalComponent } from '../sucursal';
import { FacturaComponent, CreateFacturaComponent } from '../documentos';
import { AdminComponent } from './../admin.component';
import { EquipoComponent, CreateEquipoComponent } from '../equipo';
import { CreateServicioComponent, ServicioComponent } from '../servicio';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../base';
import { PerfilComponent } from '../perfil/perfil.component';
import { ClienteServicioComponent, ClienteEquipoComponent,
         CreateClienteEquipoComponent, CreateClienteServicioComponent } from '../../cliente';
import { ReporteClienteComponent, ReporteEquipoComponent,
         ReporteFacturaComponent, ReporteProductoComponent, ReporteServicioComponent } from '../reporte/index';
import { TurnoComponent, NuevoTurnoComponent, CajaComponent, NuevaCajaComponent,
         VentasDelDiaComponent, PuntoVentaComponent } from '../punto-venta/index';
import { AdminAppComponent } from '../../estructura-pagina';
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', canActivate: [AuthGuard], component: AdminAppComponent,
        children: [
          { path: '', redirectTo: 'dashboard', canActivate: [AuthGuard],  pathMatch: 'full' },
          { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
          { path: 'perfil',  component: PerfilComponent },
          { path: 'almacenes', loadChildren: '../almacen/almacen.module#AlmacenModule' },
          { path: 'clientes', loadChildren: '../cliente/cliente.module#ClienteModule' },
          { path: 'facturas', loadChildren: '../documentos/factura/factura.module#FacturaModule' },
          { path: 'cotizaciones', loadChildren: '../documentos/cotizacion/cotizacion.module#CotizacionModule' },
          { path: 'equipos', loadChildren: '../equipo/equipo.module#EquipoModule' },
          { path: 'productos', loadChildren: '../producto/producto.module#ProductoModule' },
          { path: 'lineas', loadChildren: '../linea/linea.module#LineaModule' },
          { path: 'sucursales', loadChildren: '../sucursal/sucursal.module#SucursalModule' },
          { path: 'proveedores', loadChildren: '../proveedor/proveedor.module#ProveedorModule' },
          { path: 'tipos-movimientos', loadChildren: '../tipo-movimiento/tipo-movimiento.module#TipoMovimientoModule' },
          { path: 'usuarios', loadChildren: '../usuario/usuario.module#UsuarioModule' },
          { path: 'servicios', loadChildren: '../servicio/servicio.module#ServicioModule' }
        ]
      },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
