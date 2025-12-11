import { Component, OnDestroy, signal, input, viewChildren, EffectRef, effect, computed, inject } from '@angular/core';
import { HTMLElements, Navigation, Tools, Screen, Strings, Source }from 'coer91.tools';
import { IMenu, IMenuSelected, IScreenSize } from 'coer91.tools/interfaces'; 
import { CoerSidenavAccordion } from './coer-sidenav-accordion/coer-sidenav-accordion.component';
import { breakpointSIGNAL, isLoadingSIGNAL, navigationSIGNAL } from 'coer91.angular/signals';
import { Router } from '@angular/router';

@Component({
    selector: 'coer-sidenav',
    templateUrl: './coer-sidenav.component.html', 
    styleUrl: './coer-sidenav.component.scss', 
    standalone: false
})
export class CoerSidenav implements OnDestroy {     
    
    //Elements
    protected readonly _menuList = viewChildren(CoerSidenavAccordion); 

    //Injections
    private readonly _router = inject(Router);

    //Variables
    protected readonly _id = Tools.GetGuid("coer-sidenav"); 
    protected readonly _effectNavigation!: EffectRef;
    protected readonly _isOpen = signal<boolean>(['lg', 'xl', 'xxl'].includes(breakpointSIGNAL()));   
    protected readonly _navigationSIGNAL = navigationSIGNAL;    
    protected readonly _isLoadingSIGNAL = isLoadingSIGNAL;
    protected readonly _isLoading = signal<boolean>(false); 

    //input 
    public readonly navigation         = input<IMenu[]>([]); 
    public readonly showHomeNavigation = input<boolean>(true); 

    constructor() {
        this._effectNavigation = effect(() => {  
            const navigation: any[] = this.showHomeNavigation() 
                ? [{ id: 1, label: 'Home', icon: 'i91-house-door-fill', path: '/home', items: null } as any].concat(this.navigation()) 
                : this.navigation(); 
                                     
            navigationSIGNAL.set(navigation); 
            this.ResetSelected();
        }); 

        Screen.Resize.subscribe({
            next: ({ breakpoint }: IScreenSize) => {
                breakpointSIGNAL.set(breakpoint); 
                if(['mv', 'xs', 'sm', 'md'].includes(breakpointSIGNAL())) this.Close();
                if(['xxl'].includes(breakpointSIGNAL())) this.Open();
            }
        });
    }

    //OnDestroy
    ngOnDestroy() {
        this._effectNavigation?.destroy();
    }  
    


    //computed
    protected _showBackdrop = computed<boolean>(() => {
        return this._isOpen() && ['mv', 'xs', 'sm', 'md'].includes(breakpointSIGNAL()); 
    });
    
 
    /** */
    public Toogle() {
        if(this._isOpen()) this.Close();
        else this.Open();
    }


    /** */
    public Open() {
        this._isOpen.set(true);
    }


    /** */
    public Close() {
        this._isOpen.set(false);
    }


    /** */
    public async ResetSelected() {
        Tools.Sleep().then(() => {
            const navigation = navigationSIGNAL();
            
            if(navigation.length > 0) {                 
                const menu = Navigation.GetSelectedMenu();    
                 
                if(menu) this._NavigateToOption(menu); 
                
                else if(this.showHomeNavigation()) this._NavigateToOption({
                    id: `lv1-1-index0`,
                    menu: { ...navigation[0] },
                    level: 'LV1',
                    action: 'NONE',
                    tree: [{ id: `lv1-1-index0`, label: navigation[0].label, icon: navigation[0].icon! }]
                });  
            }
        });
        
    }


    /** */
    protected _isLoadingInner = computed(() => {
        return this._isLoading() || this._isLoadingSIGNAL();
    }); 


    /** */
    protected _IsOption(menu: IMenu) {
        return Tools.IsNull(menu?.items) && Tools.IsNotOnlyWhiteSpace(menu.path)
    }  


    /** */
    protected _ClickOptionLv1(lv1: IMenu, lv1Id: string) {
        Source.Reset();

        this._NavigateToOption({
            id: lv1Id,
            menu: { ...lv1 }, 
            level: 'LV1',
            action: 'NONE',
            tree: [
                { id: lv1Id, label: lv1.label, icon: lv1?.icon || '' }
            ]
        }, true);
    }


    /** */
    protected _ClickOptionLv2(lv2: IMenu, lv1: IMenu, lv2Id: string, lv1Id: string) {
        Source.Reset();

        this._NavigateToOption({
            id: lv2Id,
            menu: { ...lv2 }, 
            level: 'LV2',
            action: 'NONE',
            tree: [
                { id: lv1Id, label: lv1.label, icon: lv1?.icon || '' }, 
                { id: lv2Id, label: lv2.label, icon: lv2?.icon || '' }
            ]
        }, true);
    }


    /** */
    protected _ClickOptionLv3(lv3: IMenu, lv2: IMenu, lv1: IMenu, lv3Id: string, lv2Id: string, lv1Id: string) {
        Source.Reset();

        this._NavigateToOption({
            id: lv3Id,
            menu: { ...lv3 }, 
            level: 'LV3',
            action: 'NONE',
            tree: [
                { id: lv1Id, label: lv1.label, icon: lv1?.icon || '' }, 
                { id: lv2Id, label: lv2.label, icon: lv2?.icon || '' }, 
                { id: lv3Id, label: lv3.label, icon: lv3?.icon || '' }
            ]
        }, true);
    }


    /** */
    protected _ClickMenu(lv1: IMenu, isOpen: boolean, lv1Id: string) {
        this._NavigateToOption({
            id: lv1Id,
            menu: { ...lv1 }, 
            level: 'LV1',
            action: isOpen ? 'OPEN' : 'CLOSED',
            tree: [
                { id: lv1Id, label: lv1.label, icon: lv1?.icon || '' }
            ]
        });
    }


    /** */
    protected _ClickSubmenu(lv2: IMenu, lv1: IMenu, isOpen: boolean, lv2Id: string, lv1Id: string) {
        this._NavigateToOption({
            id: lv2Id, 
            menu: { ...lv2 }, 
            level: 'LV2',
            action: isOpen ? 'OPEN' : 'CLOSED',
            tree: [
                { id: lv1Id, label: lv1.label, icon: lv1?.icon || '' }, 
                { id: lv2Id, label: lv2.label, icon: lv2?.icon || '' }
            ]
        });
    }


    /** */
    protected _ClickMenuGrid(lv1: IMenu, lv1Id: string) {
        Source.Reset();

        this._NavigateToOption({
            id: lv1Id,
            menu: { ...lv1 }, 
            level: 'LV1',
            action: 'GRID',
            tree: [
                { id: lv1Id, label: lv1.label, icon: lv1?.icon || '' }
            ]
        }, true);
    } 


    /** */
    protected _ClickSubmenuGrid(lv2: IMenu, lv1: IMenu, lv2Id: string, lv1Id: string) {
        Source.Reset();

        this._NavigateToOption({
            id: lv1Id,
            menu: { ...lv2 }, 
            level: 'LV2',
            action: 'GRID',
            tree: [
                { id: lv1Id, label: lv1.label, icon: lv1?.icon || '' },
                { id: lv2Id, label: lv2.label, icon: lv2?.icon || '' }
            ]
        }, true);
    } 


    /** */
    protected async _NavigateToOption(option: IMenuSelected, navigate: boolean = false) {  
        const OPTION = { ...option };
         
        if(['NONE', 'GRID'].includes(OPTION.action)) {  
                         
            Tools.Sleep(0, 'update-menu-selected').then(() => {                 
                if(OPTION.action.equals('GRID')) {
                    if(![...OPTION.tree].pop()?.id.equals('GRID')) {
                        OPTION.tree.push({ id: 'GRID', label: 'Menu', icon: 'i91-grid' });
                    }
                     
                    if(navigate) this._router.navigateByUrl('/menu'); 
                }

                else {
                   if(navigate) this._router.navigateByUrl(String(OPTION?.menu?.path));
                } 

                if(['mv', 'xs', 'sm', 'md'].includes(breakpointSIGNAL())) {
                    this.Close();
                }
            
                OPTION.menu.items = [];
                Navigation.SetSelectedMenu(OPTION);   
                           
                document.querySelectorAll<HTMLElement>('.selected').forEach(item => item.classList.remove('selected'));
                OPTION.tree.forEach(({ id }) => HTMLElements.AddClass(`#${id}`, 'selected')); 
                                
                //Close Menus
                for(const accordion of this._menuList() || []) {                
                    if(OPTION.level.equals('LV1')) { 
                        accordion.Close();
                    }
    
                    else if(OPTION.level.equals('LV2')) {
                        if(OPTION.tree[0].id.equals(accordion.id())) continue;
                        else accordion.Close();
                    }
                }  
            });
        }  

        else {      
            for(const accordion of this._menuList() || []) {
                if(OPTION.level.equals('LV1')) {
                    if(accordion.id().equals(OPTION.id)) continue;
                    else accordion.Close();
                }

                else if(OPTION.level.equals('LV2')) {  
                    if(OPTION.tree[0].id.equals(accordion.id())) continue;
                    if(OPTION.tree[1].id.equals(accordion.id())) continue;
                    accordion.Close();                     
                }
            } 
        }    
    } 


    /** */
    protected _isMenu = (item: IMenu) => {
        return Tools.IsNotNull(item.items) && !Strings.Equals(item.show, 'GRID');
    } 
}