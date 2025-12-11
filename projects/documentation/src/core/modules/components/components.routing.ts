import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CHILDREN_PAGE } from "coer91.angular/tools";

//Pages
import { CoerAccordionPage } from './pages/coer-accordion/coer-accordion.page';
import { CoerAlertPage     } from "./pages/coer-alert/coer-alert.page";
import { CoerButtonPage    } from "./pages/coer-button/coer-button.page"; 
import { CoerGridPage      } from "./pages/coer-grid/coer-grid.page";
import { CoerModalPage     } from "./pages/coer-modal/coer-modal.page";
import { CoerSelectboxPage } from './pages/coer-selectbox/coer-selectbox.page';
import { CoerTextboxPage   } from './pages/coer-textbox/coer-textbox.page'; 
import { CoerSwitchPage    } from './pages/coer-switch/coer-switch.page'; 

export const routes: Routes = [{
    path: '',
    children: [ 
        CHILDREN_PAGE('coer-accordion', CoerAccordionPage), 
        CHILDREN_PAGE('coer-alert'    , CoerAlertPage    ), 
        CHILDREN_PAGE('coer-button'   , CoerButtonPage   ), 
        CHILDREN_PAGE('coer-grid'     , CoerGridPage     ), 
        CHILDREN_PAGE('coer-modal'    , CoerModalPage    ), 
        CHILDREN_PAGE('coer-selectbox', CoerSelectboxPage), 
        CHILDREN_PAGE('coer-textbox'  , CoerTextboxPage  ),  
        CHILDREN_PAGE('coer-switch'   , CoerSwitchPage  ),  
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComponentsRouting { }