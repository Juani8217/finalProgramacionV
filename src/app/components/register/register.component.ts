import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.authService.register(this.username, this.password)) {
      this.successMessage = '¡Registro exitoso!';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    } else {
      this.errorMessage = 'El usuario ya existe';
    }
  }
}