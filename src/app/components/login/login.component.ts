import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false; // Nuevo estado para manejar carga

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/personajes']); // Redirige a la ruta protegida
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
    
    this.isLoading = false;
  }
}