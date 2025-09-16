import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class NotFoundComponent {

  constructor(private router: Router) {}

  goHome(): void {
    const day = 17;
    const month = 9;
    const name = "Mi amor";

    this.router.navigate([`/birthday-countdown/${day}/${month}/${name}`]);
  }

  onErrorNumberClick(): void {
    const errorElement = document.querySelector('.error-number') as HTMLElement;
    if (errorElement) {
      errorElement.style.transform = 'scale(1.1)';
      setTimeout(() => {
        errorElement.style.transform = 'scale(1)';
      }, 200);
    }
  }

}
