import { Component, computed, effect, signal } from '@angular/core';
import { navigationSIGNAL } from '@library/signals';
import { page } from '@library/tools';
import { Navigation, Tools } from 'coer91.tools';
import { IMenu } from 'coer91.tools/interfaces';


@Component({
    selector: 'coer-menu-page',
    templateUrl: './coer-menu.component.html', 
    styleUrl: './coer-menu.component.scss',
    standalone: false
})
export class CoerMenuPage extends page { 
     
    //variables
    protected menu = signal<IMenu[]>([]);
    protected IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;

    constructor() { 
        super('Menu');  

        effect(() => {
            const NAVIGATION = navigationSIGNAL();

            if(NAVIGATION.length > 0) {
                const TREE = Navigation.GetSelectedMenu()?.tree.filter(x => !x.id.equals('GRID')) || [];
                const INDEX = TREE.length == 1 ? Number(TREE[0].id.split('index')[1]) : Number(TREE[1].id.split('index')[1]);
                this.SetName(TREE[0].label); 
                this.menu.set(NAVIGATION[INDEX]?.items || []);
            } 
        }); 
    }  
    
    
    //computed
    protected _pages = computed<any>(() => {
        return this.menu().filter(item => this._isPage(item)).setIndex();
    });


    //computed
    protected _submenu = computed<any>(() => {
        return this.menu().filter(item => !this._isPage(item)).setIndex();
    });


    /** */
    protected _isPage = (item: IMenu) => Tools.IsNotOnlyWhiteSpace(item?.path) && Tools.IsNull(item?.items);


    /** */
    protected _getPath = (item: IMenu) => (this._isPage(item) && item.path!.length > 0) ? item.path! : null;     
}