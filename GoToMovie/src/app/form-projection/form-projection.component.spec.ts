import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProjectionComponent } from './form-projection.component';

describe('FormProjectionComponent', () => {
  let component: FormProjectionComponent;
  let fixture: ComponentFixture<FormProjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
