import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraPilotoComponent } from './carrera-piloto.component';

describe('CarreraPilotoComponent', () => {
  let component: CarreraPilotoComponent;
  let fixture: ComponentFixture<CarreraPilotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarreraPilotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarreraPilotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
