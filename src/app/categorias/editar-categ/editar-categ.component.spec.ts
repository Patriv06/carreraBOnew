import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCategComponent } from './editar-categ.component';

describe('EditarCategComponent', () => {
  let component: EditarCategComponent;
  let fixture: ComponentFixture<EditarCategComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCategComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
