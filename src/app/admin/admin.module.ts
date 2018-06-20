import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AutoCompleteModule, ButtonModule, DataTableModule,
          InputTextModule, DropdownModule,
          TabViewModule,  DialogModule, SharedModule,  FileUploadModule, PanelMenuModule,
          ListboxModule, CalendarModule } from 'primeng/primeng';
import {InputSwitchModule} from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import {AccordionModule} from 'primeng/accordion';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { AdminAppComponent, PiePaginaComponent, ContenidoComponent, EncabezadoComponent, MenuComponent } from '../estructura-pagina';
import { ToasterModule } from 'angular2-toaster';
import { SeleccionarTurnoComponent, CobrarNotaComponent, ConsultaTipoVentaComponent } from '../share';
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
    ToasterModule,
    PanelMenuModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminAppComponent,
    SeleccionarTurnoComponent,
    MenuComponent,
    EncabezadoComponent,
    ContenidoComponent,
    PiePaginaComponent,
    PerfilComponent,
    CobrarNotaComponent,
    ConsultaTipoVentaComponent
  ],
  exports: [AdminAppComponent]
})
export class AdminModule { }
