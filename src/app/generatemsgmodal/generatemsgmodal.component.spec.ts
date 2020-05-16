import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratemsgmodalComponent } from './generatemsgmodal.component';

describe('GeneratemsgmodalComponent', () => {
  let component: GeneratemsgmodalComponent;
  let fixture: ComponentFixture<GeneratemsgmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratemsgmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratemsgmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
