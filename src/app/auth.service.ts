import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersKey = 'rick_morty_users';
  private currentUserKey = 'current_user';
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private router: Router) {
    this.initializeCurrentUser();
  }

  // Observable del usuario actual (para suscripciones reactivas)
  get currentUser$(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  // Método síncrono para obtener el usuario actual
  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  register(username: string, password: string): boolean {
    const users = this.getUsers();
    
    // Validar si el usuario ya existe
    if (users.some(u => u.username === username)) {
      return false;
    }
    
    // Registrar nuevo usuario
    const newUser = { username, password };
    users.push(newUser);
    this.saveUsers(users);
    return true;
  }

  login(username: string, password: string): boolean {
    const user = this.getUsers().find(u => 
      u.username === username && u.password === password
    );
    
    if (user) {
      this.setCurrentUser(user);
      return true;
    }
    return false;
  }

  logout(): void {
    this.clearCurrentUser();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  // Métodos privados
  private initializeCurrentUser(): void {
    const savedUser = localStorage.getItem(this.currentUserKey);
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  private setCurrentUser(user: any): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private clearCurrentUser(): void {
    localStorage.removeItem(this.currentUserKey);
    this.currentUserSubject.next(null);
  }

  private getUsers(): any[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }

  private saveUsers(users: any[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }
}