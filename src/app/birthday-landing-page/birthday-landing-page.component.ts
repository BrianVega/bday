import {Component, OnInit, AfterViewInit, ElementRef, ViewChild, ViewEncapsulation, OnDestroy} from '@angular/core';
import {PhotoService} from '../../services/photo.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PhotoInterface} from '../interfaces/PhotoInterface';

@Component({
  selector: 'app-birthday-landing-page',
  templateUrl: './birthday-landing-page.component.html',
  styleUrls: ['./birthday-landing-page.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  encapsulation: ViewEncapsulation.None
})
export class BirthdayLandingPageComponent implements OnInit, AfterViewInit, OnDestroy {
  showFab = false;
  showModal = false;
  passwordValue = '';
  passwordPlaceholder = 'Ingresa la contraseña secreta...';
  passwordError = false;
  passwordSuccess = false;

  private observer!: IntersectionObserver;
  private readonly correctPassword = '12042022';

  private photoService: PhotoService;
  photos: PhotoInterface[] = [];

  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;

  constructor(private elementRef: ElementRef, photoService: PhotoService) {
    this.photoService = photoService;
  }

  ngOnInit(): void {
    this.setupIntersectionObserver();
    this.loadPhotos();
  }

  ngAfterViewInit(): void {
    const fadeElements = this.elementRef.nativeElement.querySelectorAll('.fade-in');
    fadeElements.forEach((element: Element) => {
      this.observer.observe(element);
    });

    this.setupScrollListener();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
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

  private loadPhotos(): void {
    this.photoService.getPhotosFromAssets().subscribe({
      next: photos => {
        console.log(photos);
        this.photos = photos;
      },
      error: error => {
        console.log("Error loading photos...", error);
      }
    });
  }

  checkPassword(): void {
    const password = this.passwordValue.trim().toLowerCase();

    if (password === this.correctPassword) {
      this.passwordSuccess = true;
      this.passwordError = false;

      this.passwordPlaceholder = '¡Contraseña correcta! ❤️';

      setTimeout(() => {
        this.showModal = true;
        document.body.style.overflow = 'hidden';
      }, 800);

      setTimeout(() => {
        this.resetPasswordInput();
      }, 1000);

    } else {
      this.passwordError = true;
      this.passwordSuccess = false;

      this.passwordPlaceholder = '❌ Contraseña incorrecta, intenta de nuevo';
      this.shakePasswordInput();

      setTimeout(() => {
        this.resetPasswordInput();
        if (this.passwordInput) {
          this.passwordInput.nativeElement.focus();
        }
      }, 2000);
    }
  }

  closeModal(): void {
    this.showModal = false;
    document.body.style.overflow = 'auto';
  }

  onPasswordKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.checkPassword();
    }
  }

  onModalOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  private resetPasswordInput(): void {
    this.passwordValue = '';
    this.passwordPlaceholder = 'Ingresa la contraseña secreta...';
    this.passwordError = false;
    this.passwordSuccess = false;
  }

  private shakePasswordInput(): void {
    if (this.passwordInput) {
      const inputElement = this.passwordInput.nativeElement;
      inputElement.style.animation = 'shake 0.5s ease-in-out';

      setTimeout(() => {
        inputElement.style.animation = '';
      }, 500);
    }
  }

  get passwordInputClasses(): string {
    let classes = 'password-input';
    if (this.passwordError) classes += ' error';
    if (this.passwordSuccess) classes += ' success';
    return classes;
  }
}
