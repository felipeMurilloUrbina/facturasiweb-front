import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturaService } from '../factura.service';
import { SelectItem } from 'primeng/components/common/selectitem';
@Component({
  selector: 'app-tabla-factura',
  templateUrl: './tabla-factura.component.html',
  styleUrls: ['./tabla-factura.component.css'],
  providers: [FacturaService]
})
export class TablaFacturaComponent implements OnInit {
  facturas: any[] = [];
  clientes: SelectItem[] = [];
  sucursalId: string;
  height = '150px';
  cols: any[];
  @Input() clienteId;

  constructor(private _router: Router, private _service: FacturaService) {
    this.sucursalId = localStorage.getItem('sucursal');
    if (screen.height > 1000) {
      this.height = '610px';
    } else if (screen.height > 800) {
      this.height = '410px';
    } else if (screen.width > 600 ) {
      this.height = '290px';
    } else {
      this.height  = '250px';
    }
  }

  ngOnInit() {
    if (!this.sucursalId) {
      this._service.enviarMensaje('error', 'Error', 'Registre una sucursal primero.');
      this.regresar();
    }
    if (this.clienteId) {
      this.getFacturasCliente();
    } else {
      this.get();
    }
    this.cols = [
      { field: 'Codigo', header: 'Codigo' },
      { field: 'Cliente.Descripcion', header: 'Cliente' },
      { field: 'Fecha', header: 'Fecha' },
      { field: 'Total', header: 'Total' },
      { field: 'Estatus', header: 'Estatus' },
    ];
  }

  getFacturasCliente() {
    this._service.activarEsperando();
    this._service.getGenerico('facturas/' + this.clienteId).subscribe(data => {
      this.facturas = data;
      this.rellenarFiltro();
      this._service.cerrarEsperando();
    }, error => {
      this._service.cerrarEsperando();
      this._service.enviarMensaje('error', 'Error', 'Error al recuperar facturas, consulte a su administrador');
    });
  }

  get() {
    this._service.activarEsperando();
    this._service.get().subscribe(data => {
      this.facturas = data;
      this.rellenarFiltro();
      this._service.cerrarEsperando();
    }, error => {
      this._service.cerrarEsperando();
      this._service.enviarMensaje('error', 'Error', 'Error al recuperar facturas, consulte a su administrador');
    });
  }

  rellenarFiltro() {
    this.facturas.forEach(fact => {
      if (fact.Cliente) {
        if (!this.clientes.find(c => c.label === fact.Cliente.Descripcion)) {
          this.clientes.push({label: fact.Cliente.Descripcion, value: fact.Cliente.Descripcion});
        }else {
        }
      }
    });
  }

  reEnviar(fact) {
    this._service.activarEsperando();
    this._service.guardar('', '/' + fact.Id + '/reenviar').subscribe(data => {
      this._service.enviarMensaje('success', 'Factura', 'Factura Enviada correctamente');
      this._service.cerrarEsperando();
    }, error => {
      this._service.enviarMensaje('error', 'Error', 'Error, al enviar la factura');
      this._service.cerrarEsperando();
    });
  }

  descargarXML(fact) {
    window.open(this._service.getUrl() + '/' + fact.Id + '/xml');
  }

  descargarPDF(fact) {
    window.open(this._service.getUrl() + '/' + fact.Id + '/pdf');
  }

  cancelar(fact) {
    this._service.activarEsperando();
    this._service.guardar('', '/' + fact.Id + '/cancelar').subscribe(data => {
      this._service.enviarMensaje('success', 'Factura', 'Factura cancelada correctamente');
      this._service.cerrarEsperando();
    }, error => {
      this._service.enviarMensaje('error', 'Error', error.json().Message);
      this._service.cerrarEsperando();
    }, () => {
      this.get();
    });
  }

  regresar() {
    this._router.navigate(['/admin/sucursales'], { queryParams: {} });
  }
}
