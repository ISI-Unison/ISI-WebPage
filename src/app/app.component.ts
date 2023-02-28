import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'isi-website';

  constructor(private router: Router) {}

  navigate() {
    this.router.navigate(['noticias']);
  }
}
