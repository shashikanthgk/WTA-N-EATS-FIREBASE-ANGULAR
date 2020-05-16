import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowproductstomerchantsComponent } from './showproductstomerchants.component';

describe('ShowproductstomerchantsComponent', () => {
  let component: ShowproductstomerchantsComponent;
  let fixture: ComponentFixture<ShowproductstomerchantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowproductstomerchantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowproductstomerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
