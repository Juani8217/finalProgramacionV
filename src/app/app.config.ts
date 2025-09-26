import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <-- Nuevo import

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    importProvidersFrom(FormsModule), provideFirebaseApp(() => initializeApp({ projectId: "finalprogramacion5-8e5b2", appId: "1:157943072296:web:a9c75ce9ececec5dd4171d", storageBucket: "finalprogramacion5-8e5b2.firebasestorage.app", apiKey: "AIzaSyBjcHSA6TclboLBATpirr-e5xWfQ_3jYxM", authDomain: "finalprogramacion5-8e5b2.firebaseapp.com", messagingSenderId: "157943072296" })), provideAuth(() => getAuth()), provideAnalytics(() => getAnalytics()), ScreenTrackingService, UserTrackingService, provideFirestore(() => getFirestore()) // <-- Agregado para soportar formularios
  ]
};