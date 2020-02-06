import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniListComponent } from './mini-list.component';

describe('MiniListComponent', () => {
  let component: MiniListComponent;
  let fixture: ComponentFixture<MiniListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
