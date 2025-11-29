import { Component, AfterViewInit, OnDestroy, signal, input, viewChildren, EffectRef, effect, computed, inject } from '@angular/core';
import { HTMLElements, Navigation, Tools, Screen, Strings, Source }from 'coer91.tools';
import { IMenu, IMenuSelected, IScreenSize } from 'coer91.tools/interfaces'; 
import { CoerSidenavAccordion } from './coer-sidenav-accordion/coer-sidenav-accordion.component';
import { breakpointSIGNAL, navigationSIGNAL } from '../../../signals/index';
import { Router } from '@angular/router';

@Component({
    selector: 'coer-sidenav',
    templateUrl: './coer-sidenav.component.html', 
    styleUrl: './coer-sidenav.component.scss', 
    standalone: false
})
export class CoerSidenav implements AfterViewInit, OnDestroy {     
    
    //Elements
    protected readonly _menuList = viewChildren(CoerSidenavAccordion); 

    //Injections
    private readonly _router = inject(Router);

    //Variables
    protected readonly _id = Tools.GetGuid("coer-sidenav"); 
    protected readonly _effectNavigation!: EffectRef;
    protected readonly _isOpen = signal<boolean>(['lg', 'xl', 'xxl'].includes(breakpointSIGNAL()));   
    protected readonly _navigationSIGNAL = navigationSIGNAL;    
    protected isLoading: boolean = false; 

    //input 
    public navigation         = input<IMenu[]>([]); 
    public showHomeNavigation = input<boolean>(true); 

    constructor() {
        this._effectNavigation = effect(() => {  
            const navigation: any[] = this.showHomeNavigation() 
                ? [{ id: 1, label: 'Home', icon: 'i91-house-door-fill', path: '/home' } as any].concat(this.navigation()) 
                : this.navigation(); 
            
            Tools.Sleep().then(async () => {                 
                navigationSIGNAL.set(navigation);

                if(navigation.length > 0) {
                    await Tools.Sleep();
                    
                    const menu = Navigation.GetSelectedMenu();  
                     
                    if(menu) this._ClickOption(menu); 
                    
                    else if(this.showHomeNavigation()) this._ClickOption({
                        id: `lv1-1-index0`,
                        menu: navigation[0],
                        level: 'LV1',
                        action: 'NONE',
                        tree: [{ id: `lv1-1-index0`, label: navigation[0].label, icon: navigation[0].icon }]
                    });  
                }
            });
        }); 

        Screen.Resize.subscribe({
            next: ({ breakpoint }: IScreenSize) => {
                breakpointSIGNAL.set(breakpoint); 
                if(['mv', 'xs', 'sm', 'md'].includes(breakpointSIGNAL())) this.Close();
                if(['xxl'].includes(breakpointSIGNAL())) this.Open();
            }
        });
    }

    //AfterViewInit
    async ngAfterViewInit() {  
         
    }


    //OnDestroy
    ngOnDestroy() {
        this._effectNavigation?.destroy();
    }  
    


    //computed
    protected _showBackdrop = computed<boolean>(() => {
        return this._isOpen() && ['mv', 'xs', 'sm', 'md'].includes(breakpointSIGNAL())
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
    protected _IsOption(menu: IMenu) {
        return Tools.IsNull(menu?.items) && Tools.IsNotOnlyWhiteSpace(menu.path)
    }  


    /** */
    protected _ClickOptionLv1(lv1: IMenu, lv1Id: string) {
        Source.Reset();

        this._ClickOption({
            id: lv1Id,
            menu: { ...lv1 }, 
            level: 'LV1',
            action: 'NONE',
            tree: [
                { id: lv1Id, label: lv1.label, icon: lv1?.icon || '' }
            ]
        });
    }


    /** */
    protected _ClickOptionLv2(lv2: IMenu, lv1: IMenu, lv2Id: string, lv1Id: string) {
        Source.Reset();

        this._ClickOption({
            id: lv2Id,
            menu: { ...lv2 }, 
            level: 'LV2',
            action: 'NONE',
            tree: [
                { id: lv1Id, label: lv1.label, icon: lv1?.icon || '' }, 
                { id: lv2Id, label: lv2.label, icon: lv2?.icon || '' }
            ]
        });
    }


    /** */
    protected _ClickOptionLv3(lv3: IMenu, lv2: IMenu, lv1: IMenu, lv3Id: string, lv2Id: string, lv1Id: string) {
        Source.Reset();

        this._ClickOption({
            id: lv3Id,
            menu: { ...lv3 }, 
            level: 'LV3',
            action: 'NONE',
            tree: [
                { id: lv1Id, label: lv1.label, icon: lv1?.icon || '' }, 
                { id: lv2Id, label: lv2.label, icon: lv2?.icon || '' }, 
                { id: lv3Id, label: lv3.label, icon: lv3?.icon || '' }
            ]
        });
    }


    /** */
    protected _ClickMenu(lv1: IMenu, isOpen: boolean, lv1Id: string) {
        this._ClickOption({
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
    protected _ClickSubmenu(lv2: IMenu, lv1: IMenu, isOpen: boolean, lv1Id: string, lv2Id: string) {
        this._ClickOption({
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

        this._ClickOption({
            id: lv1Id,
            menu: { ...lv1 }, 
            level: 'LV1',
            action: 'GRID',
            tree: [
                { id: lv1Id, label: lv1.label, icon: lv1?.icon || '' }
            ]
        });
    } 


    /** */
    protected async _ClickOption(option: IMenuSelected) { 
        const OPTION = { ...option };

        if(['NONE', 'GRID'].includes(OPTION.action)) {              
            if(OPTION.action.equals('GRID')) {
                if(![...OPTION.tree].pop()?.id.equals('GRID')) {
                    OPTION.tree.push({ id: 'GRID', label: 'Menu', icon: 'i91-grip-vertical' });
                }

                this._router.navigateByUrl('/menu'); 
            }

            else {
               this._router.navigateByUrl(String(OPTION?.menu?.path));
            } 

            if(['mv', 'xs', 'sm', 'md'].includes(breakpointSIGNAL())) {
                this.Close();
            }
           
            OPTION.menu.items = [];
            Navigation.SetSelectedMenu(OPTION);   

            Tools.Sleep(0, 'update-menu-selected').then(() => {            
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