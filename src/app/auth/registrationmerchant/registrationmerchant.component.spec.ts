import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationmerchantComponent } from './registrationmerchant.component';

describe('RegistrationmerchantComponent', () => {
  let component: RegistrationmerchantComponent;
  let fixture: ComponentFixture<RegistrationmerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationmerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationmerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
