import { NgModule } from '@angular/core';   
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'coer91.tools/extensions'; 

//Components    
// import * as pages      from 'coer91.angular/pages';
import * as components from 'coer91.angular/components';
import * as directives from 'coer91.angular/directives';
import * as pipes      from 'coer91.angular/pipes'; 

//Exports
export * from 'coer91.angular/components';
export * from 'coer91.angular/directives'; 
export * from 'coer91.angular/pipes'; 

@NgModule({   
    imports: [  
        CommonModule,
        RouterModule, 
        RouterOutlet,
        FormsModule,
        ReactiveFormsModule, 
        //pages.PagesModule, 
        components.ComponentsModule,
        directives.DirectivesModule,
        pipes.PipesModule,
    ],
    providers: [
        components.CoerAlert
    ],
    exports: [ 
        CommonModule, 
        RouterModule, 
        RouterOutlet,
        FormsModule,
        ReactiveFormsModule,
        //pages.Coer91,
        components.CoerAccordion,
        components.CoerAlert,
        components.CoerButton,
        // components.CoerGrid,
        // components.CoerPageTitle,
        // components.CoerSelectBox, 
        // components.CoerSwitch,
        // components.CoerTextBox, 
        directives.ElementRefDirective,  
        pipes.DatePipe,
        pipes.DateTimePipe,
        pipes.CurrencyPipe,
        pipes.HtmlPipe,
        pipes.NoImagePipe,
        pipes.NumericFormatPipe,
        pipes.TimePipe 
    ]
})
export class coer91Module { }   