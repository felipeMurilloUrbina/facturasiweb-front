import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMovimientoComponent } from './tipo-movimiento.component';

describe('TipoMovimientoComponent', () => {
  let component: TipoMovimientoComponent;
  let fixture: ComponentFixture<TipoMovimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoMovimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
