import { NgModule } from '@angular/core';
import { routingSucursal } from './sucursal-routing.module';
import { SharedModule, ButtonModule, DataTableModule, DialogModule, FileUploadModule, AutoCompleteModule } from 'primeng/primeng';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { SucursalComponent } from './sucursal.component';
import { CreateSucursalComponent } from './create/create.component';


@NgModule({
  imports: [
    ButtonModule,    
    FormsModule,    
    ReactiveFormsModule,
    DataTableModule,
    DialogModule,
    FileUploadModule,
    SharedModule,
    TableModule,
    AutoCompleteModule,
    CommonModule, 
    routingSucursal],
  declarations: [
    SucursalComponent,
    CreateSucursalComponent
  ]
})
export class SucursalModule {}
