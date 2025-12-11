import { bootstrapApplication } from '@angular/platform-browser'; 
import { AppComponent } from './src/app.component'; 
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';   
import { ROUTES } from './src/core/root.routing'; 

bootstrapApplication(AppComponent, {
    providers: [
        provideZonelessChangeDetection(), 
        provideRouter(ROUTES, withHashLocation()), 
        provideHttpClient(), 
    ]
}).catch((err) => console.error(err)); 