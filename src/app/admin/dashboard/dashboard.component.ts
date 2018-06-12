import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { } from 'jquery';
import { } from 'morris.js';
import { } from 'jquery-knob';
import { } from 'bootstrap-datepicker';
import { } from 'jqueryui';
import { } from 'daterangepicker';
import { } from 'jquery.slimscroll';
import * as moment from 'moment';
import { DashboardService } from './dashboard.service';
import { JwtHelper } from 'angular2-jwt';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService, JwtHelper]
})
export class DashboardComponent implements OnInit {
  dataGrafica: any;
  data: any;
  user: any;
  sucursalId = 0;
  datosGraficaEnlinea: any[];
  leyendasClientes: string[] = [];
  valoresClientes: number[] = [];
  opciones: any;
  constructor(private _jwtHelper: JwtHelper, private _service: DashboardService) {
    this.user = JSON.parse(this._jwtHelper.decodeToken(localStorage.getItem('token')).user);
   }
  ngOnInit() {
    this.get();
    this.getFacturas();
  }

  get() {
    this._service.activarEsperando();
    if (this.user.Tipo === 'cliente-cliente') {
      this._service.getGenerico('reportes/cliente').subscribe(data => {
        this.data = data;
      });
    }else {
      this._service.get().subscribe(data => {
        this.data = data;
      });
    }
  }

  getFacturas() {
    this.opciones = {
      title: {
          display: true,
          text: 'Grafica Facturado en Miles(K)',
          fontSize: 16
      },
      scales: {
        xAxes: [{
            ticks: {
                display: false
            }
        }]
      },
      legend: {
          position: 'bottom'
      }
  };
    this._service.activarEsperando();
    if (this.user.Tipo === 'cliente-cliente') {
      this._service.getGenerico('reportes/cliente/facturas').subscribe(data => {
        data.facturasxCliente.forEach(element => {
          this.leyendasClientes.push(element.label.substring(0, 12));
          this.valoresClientes.push(element.Cantidad);
        });
        this.setValoresGrafica(this.leyendasClientes, this.valoresClientes);
        this._service.cerrarEsperando();
      }, error => {
        this._service.cerrarEsperando();
      });
    } else {
      this._service.getGenerico('reportes/facturas').subscribe(data => {
        data.facturasxCliente.forEach(element => {
          this.leyendasClientes.push(element.label);
          this.valoresClientes.push(element.Cantidad);
        });
        this.setValoresGrafica(this.leyendasClientes, this.valoresClientes);
        this._service.cerrarEsperando();
      }, error => {
        this._service.cerrarEsperando();
        console.log(error);
      });
    }

  }

  setValoresGrafica(labels, data) {
    this.dataGrafica = {
      labels: labels,
      datasets: [
        {
          label: 'Top 10 Clientes Ventas en Miles(K)',
          data: data,
          fill: false,
          borderColor: '#459e00'
        }
      ]
    };
  }
}
