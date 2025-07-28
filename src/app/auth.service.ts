import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersKey = 'rick_morty_users';

  // Registro de usuario
  register(username: string, password: string): boolean {
    const users = this.getUsers();
    if (users.some(u => u.username === username)) {
      return false; // Usuario ya existe
    }
    users.push({ username, password });
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  // Login de usuario
  login(username: string, password: string): boolean {
    const user = this.getUsers().find(u => 
      u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem('current_user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  // Verificar sesión activa
  isLoggedIn(): boolean {
    return !!localStorage.getItem('current_user');
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('current_user');
  }

  // Obtener usuarios registrados
  private getUsers(): any[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }
}