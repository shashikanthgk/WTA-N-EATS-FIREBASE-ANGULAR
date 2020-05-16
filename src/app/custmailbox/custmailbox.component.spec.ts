import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustmailboxComponent } from './custmailbox.component';

describe('CustmailboxComponent', () => {
  let component: CustmailboxComponent;
  let fixture: ComponentFixture<CustmailboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustmailboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustmailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
