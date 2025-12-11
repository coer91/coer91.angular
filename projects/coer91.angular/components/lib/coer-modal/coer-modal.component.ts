import { Component, input, AfterViewInit, output, OnDestroy, computed, contentChildren } from '@angular/core';
import { ElementRefDirective } from 'coer91.angular/directives';
import { CONTROL_VALUE, ControlValue } from 'coer91.angular/tools';
import { HTMLElements, Tools }from 'coer91.tools';
import { IModalHeader } from './coer-modal.interface';
import { breakpointSIGNAL } from 'coer91.angular/signals'; 

@Component({
    selector: 'coer-modal',
    templateUrl: './coer-modal.component.html', 
    styleUrl: './coer-modal.component.scss', 
    providers: [CONTROL_VALUE(CoerModal)],
    standalone: false
})
export class CoerModal extends ControlValue implements AfterViewInit, OnDestroy {    
    
    protected override _value: boolean = false;

    //Content 
    public contentElements = contentChildren<ElementRefDirective>(ElementRefDirective);

    //Variables
    protected readonly _id = Tools.GetGuid("coer-modal");      
    protected _htmlElement!: HTMLElement; 

    //input 
    public readonly header    = input<IModalHeader>({ show: true }); 
    public readonly alignX    = input<'left' | 'center' | 'right'>('center'); 
    public readonly alignY    = input<'top'  | 'middle' | 'bottom'>('top');
    public readonly width     = input<string>('fit-content'); 
    public readonly maxWidth  = input<string>('100vw');
    public readonly height    = input<string>('auto');   
    public readonly overflow  = input<'auto' | 'visible'>('auto');  

    //output 
    protected readonly onOpen       = output<void>();
    protected readonly onClose      = output<void>(); 
    protected readonly onDestroy    = output<void>();
    protected onReady               = output<void>();  
     
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


    /** Sets the value of the component */
    protected override setValue(value: any): void {
        if(typeof this._UpdateValue === 'function') {
            this._UpdateValue(value); 
        } 

        this._value = value;
        if(value === true) this.onOpen.emit();
        else this.onClose.emit()   
    }


    //computed
    protected _alignY = computed(() => {
        switch(this.alignY()) {
            case 'top'   : return 'flex-start';
            case 'bottom': return 'flex-end';
            default      : return 'center';
        }
    });
    

    //computed
    protected _alignX = computed(() => {
        switch(this.alignX()) {
            case 'left' : return 'flex-start';
            case 'right': return 'flex-end';
            default     : return 'center';
        }
    }); 


    //computed
    protected _showModalHeader = computed<boolean>(() => 
        !Tools.IsBooleanFalse(this.header().show)
    );
    
    
    //computed
    protected _modalBody = computed<any>(() => { 
        return this.contentElements().find(x => x.templateRef().equals('modal-body')) || null;
    }); 


    //computed
    protected _modalFooter = computed<any>(() => { 
        return this.contentElements().find(x => x.templateRef().equals('modal-footer')) || null;
    });


    //computed
    protected _showModalFooter = computed<boolean>(() => { 
        return Tools.IsNotNull(this._modalFooter()?.template) && this._modalFooter()?.show();
    });


    //computed
    protected _gridTemplateRows = computed(() => 
        `${(this._showModalHeader() ? '40px' : '')} 1fr ${(this._showModalFooter() ? '50px' : '')}`.cleanUpBlanks()
    ); 


    //computed
    protected _margin = computed(() => {
        const BREAKPOINT = breakpointSIGNAL();
         
        let top    = '0px';
        let right  = '0px';
        let bottom = '0px';
        let left   = '0px';

        switch(this.alignY()) {
            case 'top'   : top    = '40px'; break;
            case 'bottom': bottom = '40px'; break;
        }

        switch(this.alignX()) {
            case 'left' : left  = '40px'; break;
            case 'right': right = '40px'; break;
        }

        return ['mv', 'xs', 'sm'].includes(BREAKPOINT) ? '10px' : `${top} ${right} ${bottom} ${left}`;
    });
    
    
    //computed
    protected _maxHeight = computed(() => {
        let compensation = 80; 
        if(this._showModalHeader()) compensation += 40;
        if(this._showModalFooter()) compensation += 50;
        return `calc(100vh - ${compensation}px)`;
    });  


    /** */
    public Close() {
        if(this._value === true) {
            this.setValue(false); 
            Tools.Sleep().then(() => this.onClose.emit()); 
        }
    } 


    /** */
    public Open() {
        if(this._value === false) {
            this.setValue(true);
            Tools.Sleep().then(() => this.onOpen.emit()); 
        }
    } 


    /** */
    protected _clickBackdrop(event: any) {
        event.stopPropagation();
        HTMLElements.AddClass(`#${this._id}-content`, 'animation-beat-1');
        Tools.Sleep(1000, 'animation-beat-1').then(() => HTMLElements.RemoveClass(`#${this._id}-content`, 'animation-beat-1'));
    }
}