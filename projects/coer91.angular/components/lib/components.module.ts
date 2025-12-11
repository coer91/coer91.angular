import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'coer91.angular/directives';
import { PipesModule      } from 'coer91.angular/pipes';
import 'coer91.tools/extensions'; 

//Components 
import { CoerAccordion        } from './coer-accordion/coer-accordion.component';
import { CoerAlert            } from './coer-alert/coer-alert.component';
import { CoerButton           } from './coer-button/coer-button.component';
import { CoerGrid             } from './coer-grid/coer-grid.component';
import { CoerGridHeader       } from './coer-grid/coer-grid-header/coer-grid-header.component';
import { CoerGridBody         } from './coer-grid/coer-grid-body/coer-grid-body.component';
import { CoerGridCell         } from './coer-grid/coer-grid-cell/coer-grid-cell.component';
import { CoerGridfooter       } from './coer-grid/coer-grid-footer/coer-grid-footer.component';
import { CoerModal            } from './coer-modal/coer-modal.component';
import { CoerPageTitle        } from './coer-page-title/coer-page-title.component';
import { CoerSelectBox        } from './coer-selectbox/coer-selectbox.component';
// import { CoerSidenav          } from './coer-sidenav/coer-sidenav.component';
// import { CoerSidenavAccordion } from './coer-sidenav/coer-sidenav-accordion/coer-sidenav-accordion.component';
import { CoerSwitch           } from './coer-switch/coer-switch.component';
import { CoerTextBox          } from './coer-textbox/coer-textbox.component';
// import { CoerToolbar          } from './coer-toolbar/coer-toolbar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule, 
        DirectivesModule,
        PipesModule
    ],
    declarations: [ 
        CoerAccordion,
        CoerAlert,
        CoerButton,
        CoerGrid,
        CoerGridHeader,
        CoerGridBody,
        CoerGridCell,
        CoerGridfooter,
        CoerModal,
        CoerPageTitle,
        CoerSelectBox,
        // CoerSidenav,
        // CoerSidenavAccordion,
        CoerSwitch,
        CoerTextBox,
        // CoerToolbar
    ],
    exports: [ 
        CoerAccordion,
        CoerAlert,
        CoerButton,
        CoerGrid,
        CoerModal,
        CoerPageTitle,
        CoerSelectBox,
        // CoerSidenav, 
        CoerSwitch,
        CoerTextBox,
        // CoerToolbar
    ]
})
export class ComponentsModule { }