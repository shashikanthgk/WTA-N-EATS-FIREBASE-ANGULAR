import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddelivaryboyComponent } from './adddelivaryboy.component';

describe('AdddelivaryboyComponent', () => {
  let component: AdddelivaryboyComponent;
  let fixture: ComponentFixture<AdddelivaryboyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddelivaryboyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddelivaryboyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
