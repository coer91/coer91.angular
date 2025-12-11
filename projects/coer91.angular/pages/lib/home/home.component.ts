import { Component } from '@angular/core';  
import { page } from 'coer91.angular/tools';

@Component({
    selector: 'home-page',
    templateUrl: './home.component.html', 
    styleUrl: './home.component.scss',
    standalone: false
})
export class HomePage extends page {   
  
    constructor() { 
        super('Home');        
    }
}
