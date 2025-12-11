import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorRegisterLoginComponent } from './error-register-login.component';

describe('ErrorRegisterLoginComponent', () => {
  let component: ErrorRegisterLoginComponent;
  let fixture: ComponentFixture<ErrorRegisterLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorRegisterLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorRegisterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
