import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtPlaylistComponent } from './ct-playlist.component';

describe('CtPlaylistComponent', () => {
  let component: CtPlaylistComponent;
  let fixture: ComponentFixture<CtPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
