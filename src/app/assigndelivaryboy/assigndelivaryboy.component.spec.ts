import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigndelivaryboyComponent } from './assigndelivaryboy.component';

describe('AssigndelivaryboyComponent', () => {
  let component: AssigndelivaryboyComponent;
  let fixture: ComponentFixture<AssigndelivaryboyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigndelivaryboyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigndelivaryboyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
