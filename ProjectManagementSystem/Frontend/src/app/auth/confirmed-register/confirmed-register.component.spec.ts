import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedRegisterComponent } from './confirmed-register.component';

describe('ConfirmedRegisterComponent', () => {
  let component: ConfirmedRegisterComponent;
  let fixture: ComponentFixture<ConfirmedRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmedRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmedRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
