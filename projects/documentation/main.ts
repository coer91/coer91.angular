import { bootstrapApplication } from '@angular/platform-browser'; 
import { AppComponent } from './src/app.component'; 
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';   
import { ROUTES } from './src/core/root.routing'; 
import { CoerAlert } from 'coer91.angular/tools';

bootstrapApplication(AppComponent, {
    providers: [
        provideZonelessChangeDetection(), 
        provideRouter(ROUTES, withHashLocation()), 
        provideHttpClient(), 
        CoerAlert
    ]
}).catch((err) => console.error(err)); 