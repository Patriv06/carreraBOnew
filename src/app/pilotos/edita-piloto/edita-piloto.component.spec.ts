import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaPilotoComponent } from './edita-piloto.component';

describe('EditaPilotoComponent', () => {
  let component: EditaPilotoComponent;
  let fixture: ComponentFixture<EditaPilotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaPilotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaPilotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
