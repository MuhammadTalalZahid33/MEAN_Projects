import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditnoteComponent } from './addeditnote.component';

describe('AddeditnoteComponent', () => {
  let component: AddeditnoteComponent;
  let fixture: ComponentFixture<AddeditnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddeditnoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
