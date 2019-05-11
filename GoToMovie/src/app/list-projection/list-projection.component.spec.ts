import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjectionComponent } from './list-projection.component';

describe('ListProjectionComponent', () => {
  let component: ListProjectionComponent;
  let fixture: ComponentFixture<ListProjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
