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
  email = ''; // Cambiado de username a email
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    // Ahora authService.login devuelve un Observable, debemos suscribirnos
    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        if (user) {
          console.log('Login exitoso con Firebase:', user.email);
          this.router.navigate(['/personajes']); // Redirige a la ruta protegida
        } else {
          // Esto no debería suceder si la promesa se resolvió correctamente
          this.errorMessage = 'Credenciales inválidas.';
        }
        this.isLoading = false;
      },
      error: (err) => {
        // Manejo de errores de Firebase
        console.error('Error de login de Firebase:', err.code, err.message);
        if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
          this.errorMessage = 'Email o contraseña incorrectos.';
        } else if (err.code === 'auth/invalid-email') {
          this.errorMessage = 'El formato del email no es válido.';
        } else {
          this.errorMessage = 'Ha ocurrido un error durante el inicio de sesión.';
        }
        this.isLoading = false;
      }
    });
  }
}
