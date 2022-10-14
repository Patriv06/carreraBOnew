import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaNotComponent } from './edita-not.component';

describe('EditaNotComponent', () => {
  let component: EditaNotComponent;
  let fixture: ComponentFixture<EditaNotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaNotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaNotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
