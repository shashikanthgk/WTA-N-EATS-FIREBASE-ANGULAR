import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerorderdetailsComponent } from './customerorderdetails.component';

describe('CustomerorderdetailsComponent', () => {
  let component: CustomerorderdetailsComponent;
  let fixture: ComponentFixture<CustomerorderdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerorderdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerorderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
