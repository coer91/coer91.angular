import { NgModule } from '@angular/core';
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