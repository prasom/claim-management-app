import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintAppointmentCardComponent } from './print-appointment-card.component';

describe('PrintAppointmentCardComponent', () => {
  let component: PrintAppointmentCardComponent;
  let fixture: ComponentFixture<PrintAppointmentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintAppointmentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintAppointmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
