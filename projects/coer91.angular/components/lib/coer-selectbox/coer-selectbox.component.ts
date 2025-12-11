import { Component, input, AfterViewInit, output, OnDestroy, computed, signal, EffectRef, effect } from '@angular/core';
import { CONTROL_VALUE, ControlValue } from 'coer91.angular/tools';
import { Collections, HTMLElements, Tools } from 'coer91.tools';

@Component({
    selector: 'coer-selectbox',
    templateUrl: './coer-selectbox.component.html', 
    styleUrl: './coer-selectbox.component.scss',
    providers: [CONTROL_VALUE(CoerSelectBox)],
    standalone: false
})
export class CoerSelectBox<T> extends ControlValue implements AfterViewInit, OnDestroy {
    
    protected override _value: T | null = null;

    //Variables
    protected readonly _id = Tools.GetGuid("coer-selectbox"); 
    protected readonly _isCollapsed = signal<boolean>(true); 
    protected readonly _search = signal<string>('');
    protected readonly _applySearch = signal<boolean>(false);
    protected readonly _index = signal<number>(-1);
    protected _searchTimeOut$!: ReturnType<typeof setTimeout>;
    protected _htmlElementContainer!: HTMLInputElement; 
    protected _htmlElementOptions!: HTMLInputElement; 
    protected _htmlElement!: HTMLInputElement; 
    protected _isHoverElement: boolean = false;
    protected _isFocused: boolean = false;
    protected _isLoading: boolean = false; 

    //output
    public onInput      = output<T | null>();
    public onKeyupEnter = output<T | null>();
    public onClear      = output<void>(); 
    public onOpen       = output<void>();
    public onClose      = output<void>(); 
    public onReady      = output<void>();
    public onDestroy    = output<void>();

    //input
    public label            = input<string>('');
    public placeholder      = input<string>('');
    public displayProperty  = input<string>('name');
    public dataSource       = input<T[]>([]);
    public useIconProperty  = input<boolean>(false); 
    public isLoading        = input<boolean>(false); 
    public isReadonly       = input<boolean>(false);
    public isInvisible      = input<boolean>(false);
    public isHidden         = input<boolean>(false);   
    public textPosition     = input<'left' | 'center' | 'right'>('left');  
    public minLength        = input<number | string>(0);
    public maxLength        = input<number | string>(50);
    public showClearButton  = input<boolean>(true);
    public isInvalid        = input<boolean>(false);
    public isValid          = input<boolean>(false); 
    public width            = input<string>('100%');
    public minWidth         = input<string>('100px');
    public maxWidth         = input<string>('100%'); 
    public marginTop        = input<string>('0px');
    public marginRight      = input<string>('0px');
    public marginBottom     = input<string>('0px');
    public marginLeft       = input<string>('0px'); 


    /** Sets the value of the component */
    protected override setValue(value: T | null): void {
        if(Tools.IsNotNull(value)) { 
            if(Tools.HasProperty(value, this.displayProperty())) {                 
                value = this.dataSource().find((item: any) => String(item[this.displayProperty()]).equals((value as any)[this.displayProperty()])) || null;                 
            }

            else {
                value = this.dataSource().find((item: any) => String(item[this.displayProperty()]).equals(String(value))) || null;   
            }
        }

        if(typeof this._UpdateValue === 'function') {
            this._UpdateValue(value);  
        } 

        if(Tools.IsNull(value)) this.onClear.emit();
        this.onInput.emit(value);
         
        this._value = value;
        this._ResetSearch(value);  
    }


    //AfterViewInit
    async ngAfterViewInit() {
        await Tools.Sleep();
        this._htmlElementOptions = HTMLElements.SelectElementById(`${this._id}-options`) as HTMLInputElement;

        this._htmlElementContainer = HTMLElements.SelectElementById(`${this._id}-container`) as HTMLInputElement;
        this._htmlElementContainer?.addEventListener('mouseenter', this._onMouseEnter);
        this._htmlElementContainer?.addEventListener('mouseleave', this._onMouseLeave);

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
        this._htmlElementContainer?.removeEventListener('mouseenter', this._onMouseEnter);
        this._htmlElementContainer?.removeEventListener('mouseleave', this._onMouseLeave); 
        this.onDestroy.emit();
    } 


    //computed
    protected _dataSource = computed<any[]>(() => { 
        return Collections.SetIndex( 
            this.dataSource().filter((item: any) => Tools.IsNotOnlyWhiteSpace(this._search()) && this._applySearch()
                ? String(item[this.displayProperty()]).toUpperCase().includes(this._search().toUpperCase()) 
                : true
            )
        );
    });


    //getter
    protected get _isEnabled(): boolean {
        return this.isLoading()   === false 
            && this.isReadonly()  === false
            && this.isInvisible() === false
            && this.isHidden()    === false
    }


    //getter
    protected get _placeholder(): string {
        return (this.IsNotOnlyWhiteSpace(this._value) && Tools.IsOnlyWhiteSpace(this._search())) 
            ? (this._value as any)[this.displayProperty()]
            : (this.label().isOnlyWhiteSpace() ? this.placeholder() : ''); 
    }


    //getter
    protected get _showClearButton(): boolean {
        return this.showClearButton()
            && this._isEnabled 
            && this.IsNotOnlyWhiteSpace(this._value)
            && this.IsOnlyWhiteSpace(this._search()) 
    }


    //computed
    protected get _paddingRight(): string {
        let padding = 30;
        if(this._showClearButton) padding += 25;      
        return `${padding}px`;
    }


    //getter
    protected get _label(): string {
        return this.IsOnlyWhiteSpace(this.label()) ? this.placeholder(): this.label();
    }  

    /** */
    private _onKeyup = (event: KeyboardEvent) => {
        const { key } = event;

        if(['ArrowUp', 'ArrowDown'].includes(key)) {
            if(key === 'ArrowUp') {
                const firstIndex = (this._dataSource().length <= 0) ? -1 : 0;

                if((this._index() - 1) >= firstIndex) {
                    this._index.update(index => index - 1);
                }

                else {
                    this._index.set(-1);
                    this._htmlElement?.focus();
                    this._htmlElement?.select();
                } 
            }
    
            if(key === 'ArrowDown') {
                const lastIndex = (this._dataSource().length - 1);

                if ((this._index() + 1) <= lastIndex) {
                    this._index.update(index => index + 1);
                } 
            }
            
            HTMLElements.ScrollToElement(`#${this._id}-index${this._index()}`); 
            return;
        } 

        const selectedItem = this._dataSource().find(x => x.index == this._index()); 
        this._applySearch.set(true);

        if(['ArrowLeft', 'ArrowRight'].includes(key)) {
            this._SetSearch(this._search());
        } 

        if(key === 'Enter') {            
            if(selectedItem) this.setValue(selectedItem);
            this.Blur();
            this.onKeyupEnter.emit(this._value);
        }

        if(key === 'Delete') { 
            if(this._showClearButton) {
                this.Clear();
                return;
            }
        } 
    } 

    /** */
    private _onPaste = () => {
        Tools.Sleep().then(() => this._search.set(this._search().trim()));               
    } 

    /** */
    private _onFocus = () => {
        if(this._isLoading) return; 
        if(this._isEnabled) this.Focus(true);
        else this.Blur(); 
    } 

    /** */
    private _onBlur = () => {        
        if(this._isLoading || this._isHoverElement) return;
        else this.Blur();
    }  

    /** */
    private _onMouseEnter = () => this._isHoverElement = true;  
    private _onMouseLeave = () => this._isHoverElement = false;


    /** */
    public async Focus(open: boolean = true, scrollToElement: boolean = false) { 
        if(this._isEnabled) {
            this._isLoading = true;  
            this._applySearch.set(false);
            await Tools.Sleep();             
            
            this._htmlElement?.select();
            this._isCollapsed.set(false);  
            this._isFocused = true;
            this.onOpen.emit();
            
            if(scrollToElement) this.ScrollToElement();
            if(Tools.IsNotNull(this._value) && Tools.HasProperty(this._value, this.displayProperty())) {
                const displayProperty = (this._value as any)[this.displayProperty()];
                const index = this._dataSource().findIndex(item => String(item[this.displayProperty()]).equals(displayProperty));
                this._index.set(index);  
                HTMLElements.ScrollToElement(`#${this._id}-index${index}`);
            }
            
            this._isLoading = false; 
        }
        
        else this.Blur();   
    }

    /** */
    public async Blur() {   
        this._isLoading = true; 
        this._search.set(Tools.IsNotOnlyWhiteSpace(this._value) ? (this._value as any)[this.displayProperty()] : '');   
        await Tools.Sleep();

        this._htmlElement?.blur();  
        this._isCollapsed.set(true); 
        this._isFocused = false;  
        this._index.set(-1); 
        this.onClose.emit();

        this._isLoading = false;  
    }

    /** */
    public Clear(): void {
        this.setValue(null);
        this.Blur();    
    } 

    /** */
    protected _GetIcon = (item: any): string => { 
        return this.useIconProperty() && Tools.HasProperty(item, 'icon') ? item['icon'] : '';
    }

    /** */
    protected _GetDisplay = (item: any) => { 
        return Tools.HasProperty(item, this.displayProperty()) ? item[this.displayProperty()] : '';
    }

    /** */
    protected Toggle = async () => { 
        if(!this._isEnabled) return;
        if(this._isCollapsed()) this.Focus();
        else this.Blur();
    }  

    /** */
    public ScrollToElement(): void {
        HTMLElements.ScrollToElement(this._htmlElement);
    } 


    /** */ 
    protected _SetSearch(value: string) {
         
        this._search.set(value);  

        clearTimeout(this._searchTimeOut$);
        this._searchTimeOut$ = setTimeout(() => {
            const item = this._dataSource().find((item: any) => String(item[this.displayProperty()]).equals(value));
            if(item && Tools.HasProperty(item, 'index')) this._index.set(item.index);
            clearTimeout(this._searchTimeOut$);
        }, 500);
    } 


    /** */
    protected _ResetSearch(item: any) {
        this._search.set(Tools.IsNotOnlyWhiteSpace(item) ? (item as any)[this.displayProperty()] : '');  
    } 


    /** */
    protected _ClickOption = async (item: any) => { 
        this.Blur();        
        await Tools.Sleep();          
        this.setValue(item); 
        this._ResetSearch(item);   

        const _item = { ...item };
        if(Tools.HasProperty(_item, 'index')) delete _item['index']; 
    } 


    /** */
    public Unselect(): void {
        this._search.set('');
        this.setValue(null);
        this.Blur(); 
    }


    /**  */
    public Select(callback: number | string | ((row: T) => boolean)): T | null {
        let item: T | null = null;

        if(Tools.IsFunction(callback)) {
            item = this.dataSource().find(callback as any) || null; 
        } 
         
        else {
            item = this.dataSource().find((x: any) => String(x?.id || '') == String(callback)) || null;
        }

        this.setValue(item);
        return Tools.BreakReference(item);
    }  
}