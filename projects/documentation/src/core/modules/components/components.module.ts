//Modules
import { NgModule } from '@angular/core';    
import { SharedModule } from 'projects/documentation/src/shared/shared.module';
import { ComponentsRouting } from './components.routing';

//Pages  
import { CoerAccordionPage } from './pages/coer-accordion/coer-accordion.page';
import { CoerButtonPage } from "./pages/coer-button/coer-button.page"; 
import { CoerGridPage } from './pages/coer-grid/coer-grid.page';
import { CoerSelectboxPage } from './pages/coer-selectbox/coer-selectbox.page';
import { CoerTextboxPage } from './pages/coer-textbox/coer-textbox.page'; 

@NgModule({
    declarations: [
        CoerAccordionPage,
        CoerButtonPage,
        CoerGridPage,
        CoerSelectboxPage,
        CoerTextboxPage
    ],
    imports: [SharedModule, ComponentsRouting] 
})
export class ComponentsModule { }