import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantmailboxComponent } from './merchantmailbox.component';

describe('MerchantmailboxComponent', () => {
  let component: MerchantmailboxComponent;
  let fixture: ComponentFixture<MerchantmailboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantmailboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantmailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
