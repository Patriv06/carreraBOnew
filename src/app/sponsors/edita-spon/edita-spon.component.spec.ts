import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaSponComponent } from './edita-spon.component';

describe('EditaSponComponent', () => {
  let component: EditaSponComponent;
  let fixture: ComponentFixture<EditaSponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaSponComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaSponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
