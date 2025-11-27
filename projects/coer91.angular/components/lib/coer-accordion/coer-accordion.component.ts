import { Component, input, AfterViewInit, output, OnDestroy, computed, EffectRef, effect, signal } from '@angular/core';
import {  HTMLElements, Tools }from 'coer91.tools';

@Component({
    selector: 'coer-accordion',
    templateUrl: './coer-accordion.component.html', 
    styleUrl: './coer-accordion.component.scss', 
    standalone: false
})
export class CoerAccordion implements AfterViewInit, OnDestroy {       

    //Variables
    protected readonly _id = Tools.GetGuid("coer-accordion");
    protected readonly _effectValue!: EffectRef; 
    protected readonly _isCollapsed = signal<boolean>(false); 
    protected readonly IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    protected _htmlElement!: HTMLElement; 
     
    //output
    public onOpen    = output<void>();
    public onClose   = output<void>();
    public onReady   = output<void>();
    public onDestroy = output<void>();

    //input
    public title         = input<string>('');
    public icon          = input<string>('');
    public type          = input<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light'>('primary');
    public bodyColor     = input<boolean>(false);
    public isCollapsed   = input<boolean>(false);
    public isReadonly    = input<boolean>(false);
    public isLoading     = input<boolean>(false);
    public scrollOnOpen  = input<boolean>(false);
    public minWidth      = input<string>('100px');
    public maxWidth      = input<string>('100%');  
    public minHeight     = input<string>('70px');
    public maxHeight     = input<string>('350px'); 
    public marginTop     = input<string>('0px');
    public marginRight   = input<string>('0px');
    public marginBottom  = input<string>('0px');
    public marginLeft    = input<string>('0px');
    public padding       = input<string>('0px'); 

    constructor() {
        this._effectValue = effect(() => { 
            if(this.isCollapsed()) this.Close();
            else this.Open();
        });
    }

    //AfterViewInit
    async ngAfterViewInit() {
        await Tools.Sleep(); 
        this._htmlElement = HTMLElements.GetElementById(this._id)!;
        this.onReady?.emit(); 
    }


    //OnDestroy
    ngOnDestroy() {
        this.onReady = null as any;    
        this._effectValue?.destroy();
        this.onDestroy.emit();
    }  


    //computed
    protected _minHeight = computed<string>(() => {
        return this._isCollapsed() ? '' : this.minHeight(); 
    });


    //computed
    protected _maxHeight = computed<string>(() => {
        return this._isCollapsed() ? '' : this.maxHeight(); 
    });


    /** */
    protected Toggle = () => { 
        if(this.isReadonly()) return;
        if(this._isCollapsed()) this.Open();
        else this.Close();
    }


    /** */
    public Open(): void {
        this._isCollapsed.set(false); 

        Tools.Sleep().then(() => { 
            if(this.scrollOnOpen()) {
                HTMLElements.ScrollToElement(this._htmlElement); 
            }

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