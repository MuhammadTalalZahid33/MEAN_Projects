import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpHostComponentComponent } from './ccp-host-component.component';

describe('CcpHostComponentComponent', () => {
  let component: CcpHostComponentComponent;
  let fixture: ComponentFixture<CcpHostComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CcpHostComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcpHostComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
