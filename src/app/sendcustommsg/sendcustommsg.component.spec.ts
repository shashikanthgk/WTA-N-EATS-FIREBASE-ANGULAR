import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendcustommsgComponent } from './sendcustommsg.component';

describe('SendcustommsgComponent', () => {
  let component: SendcustommsgComponent;
  let fixture: ComponentFixture<SendcustommsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendcustommsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendcustommsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
