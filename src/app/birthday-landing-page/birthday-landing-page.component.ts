import {Component, OnInit, AfterViewInit, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-birthday-landing-page',
  templateUrl: './birthday-landing-page.component.html',
  styleUrls: ['./birthday-landing-page.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class BirthdayLandingPageComponent implements OnInit, AfterViewInit {
  showFab = false;
  private observer!: IntersectionObserver;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Setup intersection observer for fade-in animations
    this.setupIntersectionObserver();
  }

  ngAfterViewInit(): void {
    // Observe all fade-in elements
    const fadeElements = this.elementRef.nativeElement.querySelectorAll('.fade-in');
    fadeElements.forEach((element: Element) => {
      this.observer.observe(element);
    });

    // Setup scroll listener for FAB
    this.setupScrollListener();
  }

  private setupIntersectionObserver(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
  }

  private setupScrollListener(): void {
    window.addEventListener('scroll', () => {
      this.showFab = window.scrollY > 300;
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  onPhotoClick(): void {
    alert('Click here to add your photo! You can replace this with actual photo upload functionality.');
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
