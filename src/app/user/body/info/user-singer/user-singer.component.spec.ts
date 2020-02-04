import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSingerComponent } from './user-singer.component';

describe('UserSingerComponent', () => {
  let component: UserSingerComponent;
  let fixture: ComponentFixture<UserSingerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSingerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
