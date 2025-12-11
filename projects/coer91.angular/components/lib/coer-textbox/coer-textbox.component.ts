import { Component, input, AfterViewInit, output, OnDestroy } from '@angular/core';
import { CONTROL_VALUE, ControlValue } from 'coer91.angular/tools';
import { HTMLElements, Tools } from 'coer91.tools';

@Component({
    selector: 'coer-textbox',
    templateUrl: './coer-textbox.component.html', 
    styleUrl: './coer-textbox.component.scss',
    providers: [CONTROL_VALUE(CoerTextBox)],
    standalone: false
})
export class CoerTextBox extends ControlValue implements AfterViewInit, OnDestroy {
    
    protected override _value: string | number = '';

    //Variables
    protected readonly _id = Tools.GetGuid("coer-textbox");
    protected _htmlElement!: HTMLInputElement; 
    protected _isFocused: boolean = false; 

    //output
    public onInput      = output<string | number>();
    public onKeyupEnter = output<string | number>();
    public onClear      = output<void>();
    public onSearch     = output<string | number>();
    public onReady      = output<void>();
    public onDestroy    = output<void>();

    //input
    public label            = input<string>('');
    public placeholder      = input<string>('');
    public isLoading        = input<boolean>(false); 
    public isReadonly       = input<boolean>(false);
    public isInvisible      = input<boolean>(false);
    public isHidden         = input<boolean>(false);
    public selectOnFocus    = input<boolean>(false);  
    public textPosition     = input<'left' | 'center' | 'right'>('left'); 
    public minLength        = input<number | string>(0);
    public maxLength        = input<number | string>(50);
    public showClearButton  = input<boolean>(false);
    public showSearchButton = input<boolean>(false);
    public isInvalid        = input<boolean>(false);
    public isValid          = input<boolean>(false); 
    public width            = input<string>('');
    public minWidth         = input<string>('100px');
    public maxWidth         = input<string>('100%'); 
    public marginTop        = input<string>('0px');
    public marginRight      = input<string>('0px');
    public marginBottom     = input<string>('0px');
    public marginLeft       = input<string>('0px');

    //AfterViewInit
    async ngAfterViewInit() {
        await Tools.Sleep();
        this._htmlElement = HTMLElements.SelectElementById(this._id) as HTMLInputElement; 
        this._htmlElement?.addEventListener('keyup', this._onKeyup);
        this._htmlElement?.addEventListener('paste', this._onPaste);
        this._htmlElement?.addEventListener('focus', this._onFocus);
        this._htmlElement?.addEventListener('blur', this._onBlur);   
        this.onReady?.emit();
    }


    //OnDestroy
    ngOnDestroy() { 
        this.onReady = null as any;   
        this._htmlElement?.removeEventListener('keyup', this._onKeyup);
        this._htmlElement?.removeEventListener('paste', this._onPaste);
        this._htmlElement?.removeEventListener('focus', this._onFocus);
        this._htmlElement?.removeEventListener('blur', this._onBlur); 
        this.onDestroy.emit();
    } 


    /** Sets the value of the component */
    protected override setValue(value: string | number): void { 
        if(typeof this._UpdateValue === 'function') {
            this._UpdateValue(value);  
            this.onInput.emit(value);
        } 
         
        this._value = value; 
    }


    //getter
    protected get _isEnabled(): boolean {
        return this.isLoading()   === false 
            && this.isReadonly()  === false
            && this.isInvisible() === false
            && this.isHidden()    === false
    }


    //computed
    protected get _paddingRight(): string {
        let padding = 10;
        const clearOrSearch = (this._showClearButton || this._showSearchButton);
        const validOrInvalid = (this.isValid() || this.isInvalid());   
              
        if(clearOrSearch && validOrInvalid) padding = 50;
        else if (clearOrSearch || validOrInvalid) padding = 25;
        return `${padding}px`;
    }


    //getter
    protected get _label(): string {
        return this.IsOnlyWhiteSpace(this.label()) ? this.placeholder(): this.label();
    } 


    //getter
    protected get _showClearButton() {
        return this.showClearButton()
            && this._isEnabled 
            && this.IsNotOnlyWhiteSpace(this._value) 
    }


    //getter
    protected get _showSearchButton() {
        return this.showSearchButton()
            && !this._showClearButton
            && this._isEnabled
    } 


    /** */
    private _onKeyup = (event: KeyboardEvent) => {
        if(!this._isEnabled) return;

        if (event.key === 'Enter') {
            this.onKeyupEnter.emit(this._value);
            this.Blur();
        }
    } 

    /** */
    private _onPaste = () => {
        Tools.Sleep().then(() => this.setValue(this._value.toString().trim()));        
    } 

    /** */
    private _onFocus = () => {
        if(this._isEnabled) {
            if(this.selectOnFocus() === true) this.Focus(true);
            this._isFocused = true;
        }

        else this.Blur(); 
    } 

    /** */
    private _onBlur = () => {
        this.Blur();  
    }  

    /** */
    public Focus(select: boolean = false, scrollToElement: boolean = false): void {
        if(this._isEnabled) {
            this._htmlElement?.focus();
            if(select) this._htmlElement?.select();
            Tools.Sleep().then(() => {
                if(scrollToElement) this.ScrollToElement();
                this._isFocused = true;
            });            
        }
        
        else this.Blur(); 
    }

    /** */
    public Blur(): void {      
        this._htmlElement?.blur();  
        this._isFocused = false;
    }

    /** */
    public Clear(): void {
        this.setValue('');
        this.Focus(false);
        this.onClear.emit();
    }

    /** */
    protected _ClickSearch(): void {         
        if (this.showClearButton()) this.Focus();
        else this.Blur();
        this.onSearch.emit(this._value);
    } 

    /** */
    public ScrollToElement(): void {
        HTMLElements.ScrollToElement(this._htmlElement); 
    }
}