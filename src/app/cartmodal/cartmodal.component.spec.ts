import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartmodalComponent } from './cartmodal.component';

describe('CartmodalComponent', () => {
  let component: CartmodalComponent;
  let fixture: ComponentFixture<CartmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
