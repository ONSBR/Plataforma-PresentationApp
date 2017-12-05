import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaFormComponent } from './conta-form.component';

describe('ContaFormComponent', () => {
  let component: ContaFormComponent;
  let fixture: ComponentFixture<ContaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
