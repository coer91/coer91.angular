import { NgModule } from '@angular/core';
import 'coer91.tools/extensions'; 

//Directives
import { ElementRefDirective } from './coer-element-ref.directive'; 

@NgModule({
    declarations: [
        ElementRefDirective, 
    ],
    exports: [
        ElementRefDirective, 
    ]
})
export class DirectivesModule { }