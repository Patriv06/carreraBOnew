import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAutComponent } from './editar-aut.component';

describe('EditarAutComponent', () => {
  let component: EditarAutComponent;
  let fixture: ComponentFixture<EditarAutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
