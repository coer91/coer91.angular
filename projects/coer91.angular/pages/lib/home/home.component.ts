import { Component } from '@angular/core';  
import { page } from '@library/tools';

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
