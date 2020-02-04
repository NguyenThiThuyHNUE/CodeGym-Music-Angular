import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTracksComponent } from './list-tracks.component';

describe('ListTracksComponent', () => {
  let component: ListTracksComponent;
  let fixture: ComponentFixture<ListTracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTracksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
