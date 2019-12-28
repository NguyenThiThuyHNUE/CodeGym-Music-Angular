import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeNamePLComponent } from './change-name-pl.component';

describe('ChangeNamePLComponent', () => {
  let component: ChangeNamePLComponent;
  let fixture: ComponentFixture<ChangeNamePLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeNamePLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeNamePLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
