import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsuranceDetailsComponent } from './edit-insurance-details.component';

describe('EditInsuranceDetailsComponent', () => {
  let component: EditInsuranceDetailsComponent;
  let fixture: ComponentFixture<EditInsuranceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInsuranceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInsuranceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
