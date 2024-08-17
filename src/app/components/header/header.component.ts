import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private router = inject(Router);

  OnListClick(): void{
    this.router.navigate(['/home']);
  }
  OnAddClick(): void {
    this.router.navigate(['/register']);
  }
}
