import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsuranceDetailsComponent } from './add-insurance-details.component';

describe('AddInsuranceDetailsComponent', () => {
  let component: AddInsuranceDetailsComponent;
  let fixture: ComponentFixture<AddInsuranceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInsuranceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInsuranceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
