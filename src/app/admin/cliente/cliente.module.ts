import { NgModule } from '@angular/core';
import { routingCliente } from './cliente-routing.module';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, SharedModule, AutoCompleteModule,
         DialogModule, DataTableModule, DropdownModule, TabMenuModule, AccordionModule, TabViewModule, GrowlModule } from 'primeng/primeng';
import { CapturaDireccionComponent } from '../../share/captura-direccion';
import { ToasterService, ToasterModule } from 'angular2-toaster';
import { CreateClienteComponent2 } from './create2';
import { ClienteComponent } from './cliente.component';
import { CreateClienteComponent } from './create';

@NgModule({
  imports: [
    AutoCompleteModule,
    AccordionModule,
    TabMenuModule,
    TabViewModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    GrowlModule,
    DataTableModule,
    SharedModule,
    CommonModule,
    routingCliente
  ],
    declarations: [
    ClienteComponent,
    CapturaDireccionComponent,
    CreateClienteComponent,
    CreateClienteComponent2
  ],
   providers:[]
})
export class ClienteModule {}
