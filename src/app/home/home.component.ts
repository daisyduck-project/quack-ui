import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  constructor(private router: Router) {}
  redirectToJoin() {
    this.router.navigate(['/join']);
  }
}
