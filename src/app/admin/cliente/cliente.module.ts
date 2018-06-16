import { NgModule } from '@angular/core';
import { routingCliente } from './cliente-routing.module';
import { ClienteComponent, CreateClienteComponent } from '.';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, SharedModule, AutoCompleteModule,
         DialogModule, DataTableModule, DropdownModule, TabMenuModule, AccordionModule, TabViewModule } from 'primeng/primeng';
import { ClienteTablaServicioComponent } from '../../cliente';
import { CapturaDireccionComponent } from '../../share/captura-direccion';

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
    DataTableModule,
    SharedModule,
    CommonModule,
    routingCliente
  ],
    declarations: [
    ClienteComponent,
    CapturaDireccionComponent,
    ClienteTablaServicioComponent,
    CreateClienteComponent
  ]
})
export class ClienteModule {}
