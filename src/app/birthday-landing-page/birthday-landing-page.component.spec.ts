import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayLandingPageComponent } from './birthday-landing-page.component';

describe('BirthdayLandingPageComponent', () => {
  let component: BirthdayLandingPageComponent;
  let fixture: ComponentFixture<BirthdayLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthdayLandingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirthdayLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
