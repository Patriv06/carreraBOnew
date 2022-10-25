import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCarrerapilotoComponent } from './editar-carrerapiloto.component';

describe('EditarCarrerapilotoComponent', () => {
  let component: EditarCarrerapilotoComponent;
  let fixture: ComponentFixture<EditarCarrerapilotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCarrerapilotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCarrerapilotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
