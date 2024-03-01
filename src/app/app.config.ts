import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          apiKey: 'AIzaSyAVXjaCoF8kjjmBTCbtIpwVqFpuNH5Wa94',
          authDomain: 'ngrx-signals.firebaseapp.com',
          projectId: 'ngrx-signals',
          storageBucket: 'ngrx-signals.appspot.com',
          messagingSenderId: '660985609170',
          appId: '1:660985609170:web:7e0177b4c89f11bad0e60b',
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
