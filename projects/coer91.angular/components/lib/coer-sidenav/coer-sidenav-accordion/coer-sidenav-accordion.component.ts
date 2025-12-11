import { Component, input, AfterViewInit, output, OnDestroy, computed, signal } from '@angular/core';
import {  HTMLElements, Tools } from 'coer91.tools';

@Component({
    selector: 'coer-sidenav-accordion',
    templateUrl: './coer-sidenav-accordion.component.html', 
    styleUrl: './coer-sidenav-accordion.component.scss', 
    standalone: false
})
export class CoerSidenavAccordion implements AfterViewInit, OnDestroy {       

    //Variables 
    protected readonly _isCollapsed = signal<boolean>(true); 
    protected readonly IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    protected _htmlElement!: HTMLElement; 
     
    //output
    public onOpen    = output<void>();
    public onClose   = output<void>();
    public onReady   = output<void>();
    public onDestroy = output<void>();

    //input
    public id           = input<string>('');
    public title        = input<string | null | undefined>('');
    public icon         = input<string | null | undefined>('');       
    public paddingLeft  = input<string>('0px');  
    public level        = input<'LV1' | 'LV2'>('LV1');  

    //AfterViewInit
    async ngAfterViewInit() {
        await Tools.Sleep(); 
        this._htmlElement = HTMLElements.SelectElementById(this.id())!;
        this.onReady.emit();
    }


    //OnDestroy
    ngOnDestroy() { 
        this.onDestroy.emit();
    }   


    //
    public isCollapsed = computed<boolean>(() => this._isCollapsed());


    /** */
    protected Toggle = () => { 
        if(this._isCollapsed()) this.Open();
        else this.Close();
    }


    /** */
    public Open(): void {
        this._isCollapsed.set(false); 

        Tools.Sleep().then(() => {              
            HTMLElements.ScrollToElement(this._htmlElement);  
            this.onOpen.emit();
        });
    }


    /** */
    public Close(): void {
        this._isCollapsed.set(true);
        Tools.Sleep().then(() => this.onClose.emit());
    }


    /** */
    public ScrollToElement(): void {
        HTMLElements.ScrollToElement(this._htmlElement); 
    }
}