import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsureCreateComponent } from './insure-create.component';

describe('InsureCreateComponent', () => {
  let component: InsureCreateComponent;
  let fixture: ComponentFixture<InsureCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsureCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsureCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
