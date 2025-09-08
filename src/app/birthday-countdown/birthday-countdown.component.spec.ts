import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayCountdownComponent } from './birthday-countdown.component';

describe('BirthdayCountdownComponent', () => {
  let component: BirthdayCountdownComponent;
  let fixture: ComponentFixture<BirthdayCountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthdayCountdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirthdayCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
