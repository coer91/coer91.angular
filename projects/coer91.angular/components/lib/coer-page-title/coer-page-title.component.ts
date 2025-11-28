import { Component, computed, input, output, viewChild } from '@angular/core';
import { breakpointSIGNAL } from '@library/signals';
import { Navigation, Tools } from 'coer91.tools';
import { ITitleBreadcrumb, ITitleGoBack, ITitleInformation } from 'coer91.tools/interfaces';

@Component({
    selector: 'coer-page-title',
    templateUrl: './coer-page-title.component.html',
    styleUrls: ['./coer-page-title.component.scss'],
    standalone: false
})
export class CoerPageTitle {
    
    //Variables
    protected _iconRoot: string = 'i91-house-door-fill';

    //Inputs 
    public readonly title           = input<string | null>(null);
    public readonly showBreadcrumbs = input<boolean>(true);
    public readonly breadcrumbs     = input<ITitleBreadcrumb[]>([]);
    public readonly goBack          = input<ITitleGoBack>({ show: false });
    public readonly information     = input<ITitleInformation>({ show: false });
    
    //Outputs 
    public readonly onClickInformation = output<void>();


    //Constructor
    constructor() {
        const MENU = Navigation.GetSelectedMenu();

        if(MENU) {             
            const MENU_SELECTED = MENU.tree.shift();
            if(MENU_SELECTED && MENU_SELECTED.icon) {
                this._iconRoot = MENU_SELECTED.icon;
            }
        }
    } 


    // //computed
    // protected _tooltip = computed<string>(() => {
    //     return Tools.IsNotOnlyWhiteSpace(this.information()?.tooltip)
    //         ? this.information().tooltip! : 'Information';
    // }); 
    
    
    //computed
    protected _breadcrumbs = computed<any[]>(() =>  
        this.breadcrumbs().slice(0, (breakpointSIGNAL() == 'mv' ? 1 : this.breadcrumbs().length))
    );  

    //computed
    protected _showGoBack = computed<boolean>(() =>  
        this.goBack().show && Tools.IsNotOnlyWhiteSpace(this.goBack().path)
    ); 

}