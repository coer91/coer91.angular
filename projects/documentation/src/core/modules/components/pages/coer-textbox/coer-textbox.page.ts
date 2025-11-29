import { Component } from '@angular/core'; 
import { page } from '@library/tools';

@Component({
    selector: 'coer-textbox-page',
    templateUrl: './coer-textbox.page.html', 
    standalone: false
})
export class CoerTextboxPage extends page {     

    constructor() {
        super('coer-textbox');
    }
}