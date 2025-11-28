import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@library/pipes';

//Components 
import { CoerAccordion        } from './coer-accordion/coer-accordion.component';
import { CoerButton           } from './coer-button/coer-button.component';
import { CoerGrid             } from './coer-grid/coer-grid.component';
import { CoerGridHeader       } from './coer-grid/coer-grid-header/coer-grid-header.component';
import { CoerGridBody         } from './coer-grid/coer-grid-body/coer-grid-body.component';
import { CoerGridCell         } from './coer-grid/coer-grid-cell/coer-grid-cell.component';
import { CoerGridfooter       } from './coer-grid/coer-grid-footer/coer-grid-footer.component';
import { CoerSelectBox        } from './coer-selectbox/coer-selectbox.component';
import { CoerSidenav          } from './coer-sidenav/coer-sidenav.component';
import { CoerSidenavAccordion } from './coer-sidenav/coer-sidenav-accordion/coer-sidenav-accordion.component';
import { CoerTextBox          } from './coer-textbox/coer-textbox.component';
import { CoerToolbar          } from './coer-toolbar/coer-toolbar.component';

@NgModule({
    imports: [
        CommonModule, 
        RouterModule,
        FormsModule,
        ReactiveFormsModule, 
        PipesModule
    ],
    declarations: [ 
        CoerAccordion,
        CoerButton,
        CoerGrid,
        CoerGridHeader,
        CoerGridBody,
        CoerGridCell,
        CoerGridfooter,
        CoerSelectBox,
        CoerSidenav,
        CoerSidenavAccordion,
        CoerTextBox,
        CoerToolbar
    ],
    exports: [ 
        CoerAccordion,
        CoerButton,
        CoerGrid,
        CoerSelectBox,
        CoerSidenav,
        CoerTextBox,
        CoerToolbar
    ]
})
export class ComponentsModule { }