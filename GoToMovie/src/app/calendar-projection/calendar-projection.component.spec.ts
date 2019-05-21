import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarProjectionComponent } from './calendar-projection.component';

describe('CalendarProjectionComponent', () => {
  let component: CalendarProjectionComponent;
  let fixture: ComponentFixture<CalendarProjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarProjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
