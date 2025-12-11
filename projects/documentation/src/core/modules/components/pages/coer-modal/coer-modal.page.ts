import { Component } from '@angular/core'; 
import { page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-modal-page',
    templateUrl: './coer-modal.page.html', 
    standalone: false
})
export class CoerModalPage extends page {     

    constructor() {
        super('coer-modal');
    }
}