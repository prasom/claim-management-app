import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTypeDetailComponent } from './car-type-detail.component';

describe('CarTypeDetailComponent', () => {
  let component: CarTypeDetailComponent;
  let fixture: ComponentFixture<CarTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarTypeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
