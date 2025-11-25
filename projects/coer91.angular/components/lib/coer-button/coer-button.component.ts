import { Component, input, AfterViewInit, output, OnDestroy, computed } from '@angular/core';
import {  HTMLElements, Tools }from 'coer91.tools';

@Component({
    selector: 'coer-button',
    templateUrl: './coer-button.component.html', 
    styleUrl: './coer-button.component.scss', 
    standalone: false
})
export class CoerButton implements AfterViewInit, OnDestroy {       

    //Variables
    protected readonly _id = Tools.GetGuid("coer-button");     
    protected readonly IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    protected _htmlElement!: HTMLElement; 

    //output
    public onClick   = output<void>(); 
    public onReady   = output<void>();
    public onDestroy = output<void>();

    //input
    public label        = input<string>(''); 
    public type         = input<'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline'  | 'icon-outline-rounded'>('filled');
    public color        = input<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light'>('primary');
    public icon         = input<string>('');
    public path         = input<string>('');
    public iconPosition = input<'left' | 'right'>('left');
    public isLoading    = input<boolean>(false); 
    public isReadonly   = input<boolean>(false);
    public isInvisible  = input<boolean>(false);
    public isHidden     = input<boolean>(false);
    public width        = input<string>('100px');
    public minWidth     = input<string>('35px');
    public maxWidth     = input<string>('100px'); 
    public height       = input<string>('35px');
    public minHeight    = input<string>('35px');
    public maxHeight    = input<string>('35px'); 
    public marginTop    = input<string>('0px');
    public marginRight  = input<string>('0px');
    public marginBottom = input<string>('0px');
    public marginLeft   = input<string>('0px'); 

    //AfterViewInit
    async ngAfterViewInit() {
        await Tools.Sleep(); 
        this._htmlElement = HTMLElements.GetElementById(this._id)!; 
        this._htmlElement.addEventListener('focus', this._onFocus);
        this.onReady.emit();
    }


    //OnDestroy
    ngOnDestroy() {
        this._htmlElement.removeEventListener('focus', this._onFocus);
        this.onDestroy.emit();
    }  

    /** */
    private _onFocus = () => {
        if(!this._isEnabled) this.Blur(); 
    } 

    //computed
    protected _label = computed(() => {
        if(['filled', 'outline'].includes(this.type())) {
            return this.label().isOnlyWhiteSpace() ? 'Click' : this.label()
        }

        return '';
    });


    //getter
    protected get _isEnabled(): boolean {
        return this.isLoading()   === false 
            && this.isReadonly()  === false
            && this.isInvisible() === false
            && this.isHidden()    === false
    }

    //computed
    protected _width = computed(() => {
        return ['filled', 'outline'].includes(this.type()) ? this.width() : '35px';
    });

    //computed
    protected _minWidth = computed(() => {
        return ['filled', 'outline'].includes(this.type()) ? this.minWidth() : '35px';
    });

    //computed
    protected _maxWidth = computed(() => {
        return ['filled', 'outline'].includes(this.type()) ? this.maxWidth() : '35px';
    });

    //computed
    protected _height = computed(() => {
        return ['filled', 'outline'].includes(this.type()) ? this.height() : '35px';
    });

    //computed
    protected _minHeight = computed(() => {
        return ['filled', 'outline'].includes(this.type()) ? this.minHeight() : '35px';
    });

    //computed
    protected _maxHeight = computed(() => {
        return ['filled', 'outline'].includes(this.type()) ? this.maxHeight() : '35px';
    });
    
    //computed
    protected _borderRadius = computed(() => {
        return ['icon-rounded', 'icon-filled-rounded', 'icon-outline-rounded'].includes(this.type()) ? '25px' : '5px';
    });

    //computed
    protected _backgroundColor = computed<string>(() => {
        if(this.isLoading())  return 'background-color-loading animation-fade'; 
        if(this.isReadonly()) return 'background-color-readonly'; 

        return ['filled', 'icon-filled', 'icon-filled-rounded'].includes(this.type()) 
            ? `background-color-${this.color()}`
            : 'background-color-transparent';
    });

    //computed
    protected _color = computed<string>(() => {
        if(this.isLoading() || this.isReadonly())  return 'color-gray'; 

        return ['filled', 'icon-filled', 'icon-filled-rounded'].includes(this.type()) 
            ? (['warning', 'light'].includes(this.color()) ? 'color-dark' : 'color-light') 
            : `color-${this.color()}`
    });

    //computed
    protected _cursor = computed<string>(() => {
        return this._isEnabled ? 'pointer' : 'default';
    });


    protected _icon = computed<string>(() => {
        switch(this.icon()) {
            case 'add'   : return 'i91-plus font-size-20px';
            case 'save'  : return 'i91-floppy-disk-fill font-size-20px';
            case 'excel' : return 'i91-file-xls-fill font-size-17px';
            case 'import': return 'i91-file-arrow-up-fill font-size-17px';
            default: return this.icon();
        } 
    });


    protected _path = computed<string | null>(() => {
        return Tools.IsNotOnlyWhiteSpace(this.path()) ? this.path() : null; 
    });


    //Output
    protected _Click(event: any): void {
        event?.preventDefault();
        this.Blur();
        if (this._isEnabled) this.onClick.emit();
    }


    /** */
    public Click(): void {
        Tools.Sleep().then(() => this._Click(null));
    }


    /** */
    public Focus(scrollToElement: boolean = false): void {
        if(this._isEnabled) {
            Tools.Sleep().then(() => {
                this._htmlElement.focus();
                if(scrollToElement) this.ScrollToElement();
            });            
        }
        
        else this.Blur(); 
    }


    /** */
    public Blur(): void {      
        this._htmlElement.blur();
    }


    /** */
    public ScrollToElement(): void {
        HTMLElements.ScrollToElement(this._htmlElement); 
    }
}