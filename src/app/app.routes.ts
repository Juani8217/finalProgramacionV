import { Routes } from '@angular/router';
import { CharacterTableComponent } from './components/character-table/character-table.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards//auth-guard'; // Asegúrate de que la ruta sea correcta

export const routes: Routes = [
  { 
    path: '', 
    component: CharacterTableComponent,
    canActivate: [AuthGuard] // 👈 ¡Protege esta ruta!
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];