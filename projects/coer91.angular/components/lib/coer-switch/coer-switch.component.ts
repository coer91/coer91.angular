import { Component, input, AfterViewInit, output, OnDestroy } from '@angular/core';
import { CONTROL_VALUE, ControlValue } from 'coer91.angular/tools';
import {  HTMLElements, Tools }from 'coer91.tools';

@Component({
    selector: 'coer-switch',
    templateUrl: './coer-switch.component.html', 
    styleUrl: './coer-switch.component.scss',
    providers: [CONTROL_VALUE(CoerSwitch)], 
    standalone: false
})
export class CoerSwitch extends ControlValue implements AfterViewInit, OnDestroy { 
    
    protected override _value: boolean = false;

    //Variables
    protected readonly _id = Tools.GetGuid("coer-switch");      
    protected _htmlElement!: HTMLElement; 

    //output 
    protected onClick   = output<boolean>();
    protected onInput   = output<boolean>();
    protected onReady   = output<void>();
    protected onDestroy = output<void>();

    //input
    public label           = input<string>(''); 
    public labelPosition   = input<'left' | 'right'>('right'); 
    public breakLabel      = input<boolean>(true); 
    public type            = input<'switch' | 'checkbox'>('switch');
    public color           = input<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information'>('primary');  
    public textColor       = input<boolean>(true);    
    public isLoading       = input<boolean>(false); 
    public isReadonly      = input<boolean>(false);
    public isInvisible     = input<boolean>(false);
    public isHidden        = input<boolean>(false);
    public tooltip         = input<string>(''); 
    public tooltipPosition = input<'top' | 'right' | 'bottom'| 'left'>('left');  
    public width           = input<string>('fit-content'); 
    public maxWidth        = input<string>('fit-content'); 
    public marginTop       = input<string>('0px');
    public marginRight     = input<string>('0px');
    public marginBottom    = input<string>('0px');
    public marginLeft      = input<string>('0px'); 


    /** Sets the value of the component */
    protected override setValue(value: boolean): void {
        if(Tools.IsNull(value)) value = false;

        this._value = value;          
        
        if(typeof this._UpdateValue === 'function')  {
            this._UpdateValue(this._value); 
        }   
        
        Tools.Sleep(0, this._id).then(() => this.onInput.emit(value));
    }


    //getter
    protected get _isEnabled(): boolean {
        return this.isLoading()   === false 
            && this.isReadonly()  === false
            && this.isInvisible() === false
            && this.isHidden()    === false
    }


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
    
    
    /** */
    protected Toggle(): void {
        if(this._value) this.Uncheck();
        else this.Check();
        this.onClick.emit(this._value);  
    }


    protected get _textColor(): string { 
        if(this.isLoading()) return 'var(--loading)';
        return (this._value && this.textColor()) ? `var(--${this.color()})` : 'var(--dark)'; 
    }


    protected get _checkboxColor(): string { 
        let color = 'var(--light)'; 
        return (this._value && this.textColor()) ? color : 'transparent'; 
    }



    public Check(): void { 
        if(this._isEnabled) this.setValue(true); 
    }


    public Uncheck(): void { 
        if(this._isEnabled) this.setValue(false); 
    }


    /** */
    public ScrollToElement(): void {
        HTMLElements.ScrollToElement(this._htmlElement); 
    }
}