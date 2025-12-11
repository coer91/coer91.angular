import { Component } from '@angular/core'; 
import { page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-button-page',
    templateUrl: './coer-button.page.html', 
    standalone: false
})
export class CoerButtonPage extends page { 
    
    constructor() {
        super('coer-button');
    }
}