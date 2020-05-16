import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressmodalComponent } from './addressmodal.component';

describe('AddressmodalComponent', () => {
  let component: AddressmodalComponent;
  let fixture: ComponentFixture<AddressmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
