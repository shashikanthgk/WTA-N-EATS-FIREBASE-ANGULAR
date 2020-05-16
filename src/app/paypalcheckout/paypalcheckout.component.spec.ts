import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalcheckoutComponent } from './paypalcheckout.component';

describe('PaypalcheckoutComponent', () => {
  let component: PaypalcheckoutComponent;
  let fixture: ComponentFixture<PaypalcheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalcheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalcheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
