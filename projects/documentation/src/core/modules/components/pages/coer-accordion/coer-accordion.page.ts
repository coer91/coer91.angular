import { Component, viewChild } from '@angular/core'; 
import { CoerAccordion } from 'coer91.angular/components';  
import { page } from 'coer91.angular/tools';

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