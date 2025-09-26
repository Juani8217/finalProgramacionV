import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from } from 'rxjs'; // 'from' para convertir Promesas en Observables
import { map, switchMap, tap } from 'rxjs/operators';

// Importar los módulos de Firebase Authentication
import { Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Ya no necesitamos 'usersKey' ni 'currentUserKey' de localStorage
  // private usersKey = 'rick_morty_users';
  // private currentUserKey = 'current_user';

  // Usaremos un BehaviorSubject para envolver el estado del usuario de Firebase.
  // Será de tipo 'User | null' de Firebase.
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  // Inyectamos el servicio Auth de AngularFire
  private auth: Auth = inject(Auth);

  constructor(private router: Router) {
    // Escuchamos los cambios de autenticación de Firebase
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
      // Firebase ya maneja la persistencia de la sesión por nosotros
    });
  }

  // Observable del usuario actual (para suscripciones reactivas)
  // Ahora emite el objeto 'User' de Firebase o null
  get currentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  // Método síncrono para obtener el usuario actual (Firebase User)
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // --- MÉTODOS DE AUTENTICACIÓN CON FIREBASE ---

  register(email: string, password: string): Observable<User | null> {
    // Firebase usa 'email' en lugar de 'username' para la autenticación
    // Convertimos la promesa de Firebase en un Observable para compatibilidad con RxJS
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      map(userCredential => userCredential.user), // Devuelve solo el objeto User
      tap(user => {
        // Opcional: Puedes hacer algo con el usuario recién registrado aquí si quieres
        console.log('Usuario registrado en Firebase:', user?.email);
      })
    );
  }

  login(email: string, password: string): Observable<User | null> {
    // Firebase usa 'email' en lugar de 'username' para la autenticación
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map(userCredential => userCredential.user), // Devuelve solo el objeto User
      tap(user => {
        // Opcional: Puedes hacer algo con el usuario que inició sesión
        console.log('Usuario inició sesión en Firebase:', user?.email);
      })
    );
  }

  logout(): Observable<void> {
    // Firebase signOut también devuelve una promesa que convertimos a Observable
    return from(signOut(this.auth)).pipe(
      tap(() => {
        console.log('Sesión cerrada en Firebase.');
        this.router.navigate(['/login']);
      })
    );
  }

  isLoggedIn(): boolean {
    // Ahora comprueba si el valor actual del BehaviorSubject es diferente de null
    return !!this.getCurrentUser();
  }

  // --- MÉTODOS OBSOLETOS (ELIMINADOS) ---
  // Los métodos initializeCurrentUser, setCurrentUser, clearCurrentUser, getUsers, saveUsers
  // ya no son necesarios porque Firebase maneja todo esto internamente.
  // Asegúrate de eliminarlos de tu servicio.
}
