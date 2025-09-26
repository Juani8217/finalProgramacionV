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
  email = ''; // Cambiado de username a email
  password = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false; // Añadimos isLoading para una mejor UX

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Ahora authService.register devuelve un Observable, debemos suscribirnos
    this.authService.register(this.email, this.password).subscribe({
      next: (user) => {
        if (user) {
          console.log('Registro exitoso con Firebase:', user.email);
          this.successMessage = '¡Registro exitoso! Redirigiendo...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        } else {
          // Esto no debería suceder si la promesa se resolvió correctamente
          this.errorMessage = 'Error en el registro.';
        }
        this.isLoading = false;
      },
      error: (err) => {
        // Manejo de errores de Firebase
        console.error('Error de registro de Firebase:', err.code, err.message);
        if (err.code === 'auth/email-already-in-use') {
          this.errorMessage = 'El email ya está en uso por otra cuenta.';
        } else if (err.code === 'auth/weak-password') {
          this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
        } else if (err.code === 'auth/invalid-email') {
          this.errorMessage = 'El formato del email no es válido.';
        } else {
          this.errorMessage = 'Ha ocurrido un error durante el registro.';
        }
        this.isLoading = false;
      }
    });
  }
}
