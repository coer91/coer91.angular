import { Component } from '@angular/core'; 
import { page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-switch-page',
    templateUrl: './coer-switch.page.html', 
    standalone: false
})
export class CoerSwitchPage extends page {   
    
    protected value1: boolean = false;

    constructor() {
        super('coer-switch');
    }
}