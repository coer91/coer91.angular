//Modules
import { NgModule } from '@angular/core';    
import { SharedModule } from 'projects/documentation/src/shared/shared.module';
import { ComponentsRouting } from './components.routing';

//Pages  
import { CoerAccordionPage } from './pages/coer-accordion/coer-accordion.page';
import { CoerAlertPage     } from './pages/coer-alert/coer-alert.page';
import { CoerButtonPage    } from "./pages/coer-button/coer-button.page"; 
import { CoerGridPage      } from './pages/coer-grid/coer-grid.page';
import { CoerModalPage     } from './pages/coer-modal/coer-modal.page';
import { CoerSelectboxPage } from './pages/coer-selectbox/coer-selectbox.page';
import { CoerTextboxPage   } from './pages/coer-textbox/coer-textbox.page';  
import { CoerSwitchPage    } from './pages/coer-switch/coer-switch.page';

@NgModule({
    declarations: [
        CoerAccordionPage,
        CoerAlertPage,
        CoerButtonPage,
        CoerGridPage,
        CoerModalPage,
        CoerSelectboxPage,
        CoerTextboxPage,
        CoerSwitchPage
    ],
    imports: [SharedModule, ComponentsRouting] 
})
export class ComponentsModule { }