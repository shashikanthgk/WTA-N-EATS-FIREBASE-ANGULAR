import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentdetailsmodalComponent } from './paymentdetailsmodal.component';

describe('PaymentdetailsmodalComponent', () => {
  let component: PaymentdetailsmodalComponent;
  let fixture: ComponentFixture<PaymentdetailsmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentdetailsmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentdetailsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
