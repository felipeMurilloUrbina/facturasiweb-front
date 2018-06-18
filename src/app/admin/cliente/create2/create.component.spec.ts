import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClienteComponent } from './create.component';

describe('CreateClienteComponent', () => {
  let component: CreateClienteComponent;
  let fixture: ComponentFixture<CreateClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
