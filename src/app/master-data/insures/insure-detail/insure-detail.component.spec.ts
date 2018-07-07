import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsureDetailComponent } from './insure-detail.component';

describe('InsureDetailComponent', () => {
  let component: InsureDetailComponent;
  let fixture: ComponentFixture<InsureDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsureDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
