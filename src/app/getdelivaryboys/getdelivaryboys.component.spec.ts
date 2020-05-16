import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetdelivaryboysComponent } from './getdelivaryboys.component';

describe('GetdelivaryboysComponent', () => {
  let component: GetdelivaryboysComponent;
  let fixture: ComponentFixture<GetdelivaryboysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetdelivaryboysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetdelivaryboysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
