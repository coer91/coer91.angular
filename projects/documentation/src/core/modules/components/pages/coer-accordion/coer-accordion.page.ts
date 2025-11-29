import { Component, viewChild } from '@angular/core'; 
import { CoerAccordion } from '@library/components';  
import { page } from '@library/tools';

@Component({
    selector: 'coer-accordion-page',
    templateUrl: './coer-accordion.page.html', 
    standalone: false
})
export class CoerAccordionPage extends page {   
    
    //Elements
    protected accordion1 = viewChild<CoerAccordion>('accordion1');

    //Variables  
     
    constructor() {
        super('coer-accordion');
    }


    //Main
    override RunPage() {
         
    }   
}