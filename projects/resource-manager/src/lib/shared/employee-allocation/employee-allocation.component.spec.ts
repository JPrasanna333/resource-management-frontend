import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAllocationComponent } from './employee-allocation.component';

describe('EmployeeAllocationComponent', () => {
  let component: EmployeeAllocationComponent;
  let fixture: ComponentFixture<EmployeeAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
