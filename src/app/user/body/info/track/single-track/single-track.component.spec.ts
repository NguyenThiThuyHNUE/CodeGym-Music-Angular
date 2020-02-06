import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTrackComponent } from './single-track.component';

describe('SingleTrackComponent', () => {
  let component: SingleTrackComponent;
  let fixture: ComponentFixture<SingleTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
