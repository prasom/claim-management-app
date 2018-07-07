import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsureListComponent } from './insure-list.component';

describe('InsureListComponent', () => {
  let component: InsureListComponent;
  let fixture: ComponentFixture<InsureListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsureListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
