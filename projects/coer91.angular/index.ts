import { NgModule } from '@angular/core';   
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'coer91.tools/extensions';
 
//Components   
import * as pages      from '@library/pages';
import * as components from '@library/components';
import * as pipes      from '@library/pipes'; 

@NgModule({  
    imports: [  
        CommonModule,
        RouterModule, 
        RouterOutlet,
        FormsModule,
        ReactiveFormsModule,
        components.ComponentsModule,
        pages.PagesModule,
        pipes.PipesModule,
    ],
    exports: [ 
        CommonModule,
        RouterModule, 
        RouterOutlet,
        FormsModule,
        ReactiveFormsModule,
        components.CoerAccordion,
        components.CoerButton,
        components.CoerGrid,
        components.CoerPageTitle,
        components.CoerSelectBox,
        components.CoerSidenav, // Este NO
        components.CoerSwitch,
        components.CoerTextBox,
        components.CoerToolbar, // ESTE NO
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