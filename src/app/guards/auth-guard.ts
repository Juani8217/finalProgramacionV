import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    // Redirige a login y guarda la URL intentada (para post-login)
    this.router.navigate(['/login'], { 
      queryParams: { returnUrl: this.router.url } 
    });
    return false;
  }
}