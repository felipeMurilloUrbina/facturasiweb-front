import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AutoCompleteModule, ButtonModule, DataTableModule,
          InputTextModule, ChartModule, DropdownModule,
          TabViewModule,  DialogModule, 
          GrowlModule, SharedModule,  FileUploadModule, PanelMenuModule,
          EditorModule, ListboxModule, CalendarModule } from 'primeng/primeng';
import {InputSwitchModule} from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import {AccordionModule} from 'primeng/accordion';
import { ServicioComponent,
          TablaServicioComponent, CreateServicioComponent } from './servicio';
import { PerfilComponent } from './perfil/perfil.component';
import { ClienteServicioComponent, ClienteTablaServicioComponent,
         ClienteEquipoComponent, CreateClienteEquipoComponent, CreateClienteServicioComponent } from '../cliente';
import { ReporteClienteComponent, ReporteEquipoComponent, ReporteFacturaComponent,
         ReporteProductoComponent, ReporteServicioComponent } from './reporte/index';
import { PuntoVentaComponent, NuevaCajaComponent, TurnoComponent,
         CajaComponent, NuevoTurnoComponent, VentasDelDiaComponent } from './punto-venta/index';
import {  ConsultaArchivoComponent, ConsultaClienteComponent, ConsultaProductoComponent,
        ConsultaTipoVentaComponent, CobrarNotaComponent, SeleccionarTurnoComponent,  } from '../share';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { AdminAppComponent, PiePaginaComponent, ContenidoComponent, EncabezadoComponent, MenuComponent } from '../estructura-pagina';
@NgModule({
  imports: [
    AccordionModule,
    AutoCompleteModule,
    AdminRoutingModule,
    ButtonModule,
    CalendarModule,
    CommonModule,
    DataTableModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    FormsModule,
    InputTextModule,
    InputSwitchModule,
    ListboxModule,
    MultiSelectModule,
    SharedModule,
    TabViewModule,
    TableModule,
    PanelMenuModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminAppComponent,
    MenuComponent,
    EncabezadoComponent,
    ContenidoComponent,
    PiePaginaComponent,
    PerfilComponent,
  ],
  exports: [AdminAppComponent]
})
export class AdminModule { }
