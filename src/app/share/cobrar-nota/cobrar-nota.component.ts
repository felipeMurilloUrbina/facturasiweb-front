import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CobrarNotaService } from './cobrar-nota.service';
import { Cliente } from '../../modelos/index';
declare var $: any;
@Component({
  selector: 'app-cobrar-nota',
  templateUrl: './cobrar-nota.component.html',
  styleUrls: ['./cobrar-nota.component.css'],
  providers: [CobrarNotaService]
})
export class CobrarNotaComponent implements OnInit {
  @Input() visible;
  @Input() puntoVenta;
  @Output() emitter = new EventEmitter();
  constructor(private _router: Router, private _route: ActivatedRoute, private _fb: FormBuilder, private _service: CobrarNotaService) {
  }

  ngOnInit() {
    // this.gset();
  }

  cobrar(event) {
    this.emitter.emit(event);
    this.visible = false;
  }

  cancelar() {
    this.emitter.emit(undefined);
  }

}
