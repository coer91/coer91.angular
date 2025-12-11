import { Component, input, AfterViewInit, output, OnDestroy } from '@angular/core';
import { CONTROL_VALUE, ControlValue } from 'coer91.angular/tools';
import {  HTMLElements, Tools }from 'coer91.tools';

@Component({
    selector: 'coer-accordion',
    templateUrl: './coer-accordion.component.html', 
    styleUrl: './coer-accordion.component.scss', 
    providers: [CONTROL_VALUE(CoerAccordion)],
    standalone: false
})
export class CoerAccordion extends ControlValue implements AfterViewInit, OnDestroy {      
    
    protected override _value: boolean = true;

    //Variables
    protected readonly _id = Tools.GetGuid("coer-accordion");  
    protected _htmlElement!: HTMLElement; 
     
    //output
    public readonly onOpen    = output<void>();
    public readonly onClose   = output<void>();
    public readonly onDestroy = output<void>();
    public onReady            = output<void>();

    //input
    public readonly title         = input<string>('');
    public readonly icon          = input<string>('');
    public readonly type          = input<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light'>('primary');
    public readonly bodyColor     = input<boolean>(false);
    public readonly isCollapsed   = input<boolean>(false);
    public readonly isReadonly    = input<boolean>(false);
    public readonly isLoading     = input<boolean>(false);
    public readonly scrollOnOpen  = input<boolean>(false);
    public readonly minWidth      = input<string>('100px');
    public readonly maxWidth      = input<string>('100%');  
    public readonly minHeight     = input<string>('70px');
    public readonly maxHeight     = input<string>('350px'); 
    public readonly marginTop     = input<string>('0px');
    public readonly marginRight   = input<string>('0px');
    public readonly marginBottom  = input<string>('0px');
    public readonly marginLeft    = input<string>('0px');
    public readonly padding       = input<string>('0px');  

    //AfterViewInit
    async ngAfterViewInit() {
        await Tools.Sleep(); 
        this._htmlElement = HTMLElements.SelectElementById(this._id)!;
        this.onReady?.emit(); 
    }


    //OnDestroy
    ngOnDestroy() {
        this.onReady = null as any;    
        this.onDestroy.emit();
    }  


    //computed
    protected get _isCollapsed() {
        return this._value === false; 
    }


    //computed
    protected get _minHeight() {
        return this._isCollapsed ? '' : this.minHeight(); 
    }


    //computed
    protected get _maxHeight () {
        return this._isCollapsed ? '' : this.maxHeight(); 
    }


    /** */
    protected Toggle = () => { 
        if(this.isReadonly()) return;
        if(this._isCollapsed) this.Open();
        else this.Close();
    }


    /** */
    public Open(): void {
        this.setValue(true);

        Tools.Sleep().then(() => { 
            if(this.scrollOnOpen()) {
                HTMLElements.ScrollToElement(this._htmlElement); 
            }

            this.onOpen.emit();
        });
    }


    /** */
    public Close(): void {
        this.setValue(false);
        Tools.Sleep().then(() => this.onClose.emit());
    }


    /** */
    public ScrollToElement(): void {
        HTMLElements.ScrollToElement(this._htmlElement); 
    }
}