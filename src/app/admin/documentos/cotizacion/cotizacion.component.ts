import { Component, OnInit } from '@angular/core';
import { CotizacionService } from './cotizacion.service';
import { Router } from '@angular/router';
import { Cotizacion } from '../../../modelos/cotizacion.model';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css'],
  providers: [CotizacionService]
})
export class CotizacionComponent implements OnInit {
  cotizaciones: any[];
  cols: any[];
  consultaArchivo = false;
  cotizacion = new Cotizacion();
  constructor(private _router: Router, private _service: CotizacionService) {
    this.cols = [
      { field: 'Codigo', header: 'Codigo' },
      { field: 'Cliente.Descripcion', header: 'Cliente' },
      { field: 'Fecha', header: 'Fecha' },
      { field: 'Total', header: 'Total' },
      { field: 'Estatus.Descripcion', header: 'Estatus' },
    ];
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this._service.get().subscribe(data => {
      this.cotizaciones = data;
      console.log(this.cotizaciones);
    });
  }

  getArchivos(cotizacion) {
    this.consultaArchivo = true;
    this.cotizacion = cotizacion;
  }

  descargarPDF(cotizacion) {
    window.open(this._service.getUrl() + '/' + cotizacion.Id + '/pdf');
  }

  onEditar(cotizacion) {
    this._router.navigate(['/admin/cotizaciones/editar', cotizacion.Id]);
  }
}
