import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCotizacionComponent } from './create-cotizacion.component';

describe('CreateCotizacionComponent', () => {
  let component: CreateCotizacionComponent;
  let fixture: ComponentFixture<CreateCotizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCotizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
