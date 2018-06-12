import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReporteService } from '../reporte.service';
declare var AdminLTE: any;
declare var $: any;
@Component({
  selector: 'app-reporte-factura',
  templateUrl: './reporte-factura.component.html',
  styleUrls: ['./reporte-factura.component.css'],
  providers: [ReporteService]
})
export class ReporteFacturaComponent implements OnInit {
  sucursalId: string;
  clientes: any[]= [];
  clientesSeleccionados: any[];
  formaPagos: any[]= [];
  formaPagoSeleccionado: any[];
  es: any;
  inicio = new Date();
  fin = new Date();
  constructor(private _router: Router, private _service: ReporteService) {
    this.sucursalId = localStorage.getItem('sucursal');
    this.setMexico();
  }

  ngOnInit() {
    this.getClientes();
    this.getFormaPagos();
  }
  setMexico() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
      dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
      dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
      monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
      monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
      today: 'Hoy',
      clear: 'Borrar'
  }
  }

  getClientes() {
    this._service.getGenerico('clientes').subscribe(data => {
      this.clientes = data;
    }, error => {},
    () => {
      this._service.cerrarEsperando();
    });
  }

  getFormaPagos() {
    this._service.getGenerico('util/forma-pagos').subscribe(data => {
      this.formaPagos = data;
    }, error => {},
    () => {
      this._service.cerrarEsperando();
    });
  }

  getFacturas() {
    let ReporteFactura = {
      clientes: this.clientesSeleccionados,
      MetodosPago: this.formaPagoSeleccionado,
      Inicio: this.inicio,
      Fin: this.fin
    };
    this._service.activarEsperando();
    this._service.postGenerico(ReporteFactura, 'reportes/facturas/listado').subscribe(data => {
      console.log(data);
      if ($.fn.dataTable.isDataTable('#tabla')) {
        let table = $('#tabla').DataTable();
        table.clear();
        table.rows.add(data);
        table.draw();
      } else {
      $('#tabla').DataTable( {
        data: data,
        columns: [
          { data: 'Codigo', title: 'Codigo' },
          { data: 'MetodoPago.Descripcion', title: 'Metodo Pago'},
          { data: 'Cliente.Descripcion', title: 'Razon Social'},
          { data: 'Iva', title: 'Iva'},
          { data: 'Total', title: 'Total'},
          { data: 'Fecha', title: 'Fecha'}
        ],
        language: {
            url: 'assets/js/Spanish.json'
          },
        dom: 'Bfrtip',
        buttons: [{
          extend: 'print',
          text: 'Imprimir Reporte'
        }]
      });

    }
    this._service.cerrarEsperando();
    });
  }

  editar(cliente) {
    this._router.navigate(['/admin/clientes/editar', cliente.Id]);
  }
}
