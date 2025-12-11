import { Component, computed, effect, signal } from '@angular/core';
import { navigationSIGNAL } from 'coer91.angular/signals';
import { page } from 'coer91.angular/tools';
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
    protected title = signal<string>('Menu');
    protected IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;

    constructor() { 
        super('Menu');  

        effect(() => {
            const NAVIGATION = navigationSIGNAL();

            if(NAVIGATION.length > 0) {
                
               
                let INDEX_SUBMENU: string | null = null;

                const TREE = Navigation.GetSelectedMenu()?.tree.filter(x => !x.id.equals('GRID')) || [];
                
                if(TREE.length > 0) {
                    this.title.set(TREE[0].label);
                    const INDEX_MENU = Number(TREE[0].id.split('index')[1]);
                    const MENU = NAVIGATION[INDEX_MENU]?.items || [];
                                        
                    if(TREE.length > 1) {
                        const INDEX_SUBMENU = Number(TREE[1].id.split('index')[1]);
                        const SUBMENU = MENU[INDEX_SUBMENU]?.items || [];
                        this.menu.set(SUBMENU);
                    }

                    else this.menu.set(MENU);
                } 
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