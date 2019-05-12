import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBoDashboardComponent } from './user-bo-dashboard.component';

describe('UserBoDashboardComponent', () => {
  let component: UserBoDashboardComponent;
  let fixture: ComponentFixture<UserBoDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBoDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
