import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpHostComponent } from './ccp-host.component';

describe('CcpHostComponent', () => {
  let component: CcpHostComponent;
  let fixture: ComponentFixture<CcpHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CcpHostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcpHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
