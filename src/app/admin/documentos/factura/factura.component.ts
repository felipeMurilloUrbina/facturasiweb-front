import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturaService } from './factura.service';
@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
  providers: [FacturaService]
})
export class FacturaComponent implements OnInit {
  facturas: any[] = [];
  sucursalId: string;
  constructor(private _router: Router, private _service: FacturaService) {
    this.sucursalId = localStorage.getItem('sucursal');
  }

  ngOnInit() {
    if (!this.sucursalId) {
      this._service.enviarMensaje('error', 'Error', 'Registre una sucursal primero.');
      this.regresar();
    }
  }

  regresar() {
    this._router.navigate(['/admin/sucursales'], { queryParams: {} });
  }

}
