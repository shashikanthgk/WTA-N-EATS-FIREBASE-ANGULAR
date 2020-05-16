import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMerchantComponent } from './show-merchant.component';

describe('ShowMerchantComponent', () => {
  let component: ShowMerchantComponent;
  let fixture: ComponentFixture<ShowMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
