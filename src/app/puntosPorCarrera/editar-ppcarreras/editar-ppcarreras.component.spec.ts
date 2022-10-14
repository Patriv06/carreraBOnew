import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPPCarrerasComponent } from './editar-ppcarreras.component';

describe('EditarPPCarrerasComponent', () => {
  let component: EditarPPCarrerasComponent;
  let fixture: ComponentFixture<EditarPPCarrerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPPCarrerasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPPCarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
