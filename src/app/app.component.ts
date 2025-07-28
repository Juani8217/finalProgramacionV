import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CharacterTableComponent } from './components/character-table/character-table.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    CharacterTableComponent
  ],
  template: `
    <header>
      <nav>
        <!-- Logo o título -->
        <span class="app-title">Rick & Morty App</span>
        
        <!-- Menú de navegación -->
        <div class="nav-links">
          <a routerLink="/" class="nav-link">Inicio</a>
          <a *ngIf="!auth.isLoggedIn()" routerLink="/login" class="nav-link">Login</a>
          <a *ngIf="!auth.isLoggedIn()" routerLink="/register" class="nav-link">Registro</a>
          <button *ngIf="auth.isLoggedIn()" (click)="auth.logout()" class="logout-btn">
            Cerrar sesión
          </button>
          <span *ngIf="auth.isLoggedIn()" class="welcome-message">
            ¡Hola, {{getUsername()}}!
          </span>
        </div>
      </nav>
    </header>
    
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    header {
      background: #0d0221;
      box-shadow: 0 2px 10px rgba(5, 217, 232, 0.3);
    }
    
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .app-title {
      color: #05d9e8;
      font-size: 1.5rem;
      font-weight: bold;
      text-shadow: 0 0 5px rgba(5, 217, 232, 0.5);
    }
    
    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    
    .nav-link {
      color: #05d9e8;
      text-decoration: none;
      transition: all 0.3s ease;
      padding: 0.5rem;
    }
    
    .nav-link:hover {
      color: #ff2a6d;
      text-shadow: 0 0 5px rgba(255, 42, 109, 0.5);
    }
    
    .logout-btn {
      background: #ff2a6d;
      border: none;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .logout-btn:hover {
      background: #d300c5;
      box-shadow: 0 0 10px rgba(211, 0, 197, 0.5);
    }
    
    .welcome-message {
      color: #f0e14a;
      margin-left: 1rem;
      font-size: 0.9rem;
    }
    
    main {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 2rem;
    }
  `]
})
export class AppComponent {
  constructor(public auth: AuthService) {}

  getUsername(): string {
    const user = localStorage.getItem('current_user');
    return user ? JSON.parse(user).username : '';
  }
}