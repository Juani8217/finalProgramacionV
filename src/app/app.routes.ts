import { Routes } from '@angular/router';
import { CharacterTableComponent } from './components/character-table/character-table.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', component: CharacterTableComponent }, // Ruta actual del buscador
  { path: 'login', component: LoginComponent },    // Nueva ruta
  { path: 'register', component: RegisterComponent } // Nueva ruta
];