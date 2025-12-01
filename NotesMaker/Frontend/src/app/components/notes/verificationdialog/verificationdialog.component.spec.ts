import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationdialogueComponent } from './verificationdialog.component';

describe('VerificationdialogueComponent', () => {
  let component: VerificationdialogueComponent;
  let fixture: ComponentFixture<VerificationdialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificationdialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationdialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
