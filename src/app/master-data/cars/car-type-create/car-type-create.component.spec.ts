import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTypeCreateComponent } from './car-type-create.component';

describe('CarTypeCreateComponent', () => {
  let component: CarTypeCreateComponent;
  let fixture: ComponentFixture<CarTypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
