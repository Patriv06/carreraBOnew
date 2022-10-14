import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosPorCarreraComponent } from './puntos-por-carrera.component';

describe('PuntosPorCarreraComponent', () => {
  let component: PuntosPorCarreraComponent;
  let fixture: ComponentFixture<PuntosPorCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntosPorCarreraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntosPorCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
