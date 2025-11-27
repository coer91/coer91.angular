import { Component, AfterViewInit, OnDestroy, viewChild } from '@angular/core'; 
import { CoerAccordion } from '@library/components';

@Component({
    selector: 'coer-accordion-page',
    templateUrl: './coer-accordion.page.html', 
    standalone: false
})
export class CoerAccordionPage implements AfterViewInit, OnDestroy {   
    
    //Elements
    protected accordion1 = viewChild<CoerAccordion>('accordion1');

    //Variables
     

    //output
    

    //input
     

    //AfterViewInit
    async ngAfterViewInit() {
       
    }


    //OnDestroy
    ngOnDestroy() {
         
    }   
}