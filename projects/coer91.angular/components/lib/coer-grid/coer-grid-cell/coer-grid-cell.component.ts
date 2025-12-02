import { Component, computed, input, output } from '@angular/core';  
import { IGridColumnIndex, IGridItem } from '../interfaces';
import { Dates, Tools } from 'coer91.tools';

@Component({
    selector: 'coer-grid-cell',
    templateUrl: './coer-grid-cell.component.html',
    styleUrl: './coer-grid-cell.component.scss',
    standalone: false
})
export class CoerGridCell<T> {

    //Elements   

    //Inputs 
    public readonly ApplyFormat = input.required<(value: any, type: 'string' | 'number' | 'currency' | 'date' | 'datetime' | 'time') => string>();
    public readonly id          = input.required<string>();
    public readonly column      = input.required<IGridColumnIndex<T>>();
    public readonly row         = input.required<any>();
    public readonly minHeight   = input.required<string>();  
    public readonly isEnabled   = input.required<boolean>();
    public readonly isLoading   = input.required<boolean>();

    //Outputs 
    protected readonly onSwitchChange   = output<IGridItem<T>>();
    protected readonly onClickRow       = output<T>();
    protected readonly onDoubleClickRow = output<T>();

    /** */
    public get input(): 'coer-switch' | 'coer-textbox' | 'coer-numberbox' | 'coer-selectbox' | 'coer-datebox' | '' {
        if(this.isEnabled() && Tools.IsNull(this.column().config?.template)) {
            if(Tools.IsBooleanTrue(this.column().config?.coerSwitch) || (Tools.IsFunction(this.column().config?.coerSwitch) && this._switchAttributes()?.showInput)) {
                return 'coer-switch';
            }

            // else if(this._textboxAttributes()?.showInput) {
            //     return 'coer-textbox';
            // }

            // else if(this._numberboxAttributes()?.showInput) {
            //     return 'coer-numberbox';
            // }

            // else if(this._selectboxAttributes()?.showInput) {
            //     return 'coer-selectbox';
            // }

            // else if(this._dateboxAttributes()?.showInput) {
            //     return 'coer-datebox';
            // }
        }

        return '';
    }  


    /** */
    protected _GetCellValue = computed<string>(() => {  
        let value = (this.row() as any)[this.column().config.property] || ''; 
        
        //Template
        if(Tools.IsNotNull(this.column().config?.template)) {  
            if(Tools.IsFunction(this.column()?.config?.template)) {
                return (this.column()?.config as any)?.template({
                    indexRow: this.row().indexRow,
                    property: this.column()?.config?.property,
                    row: { ...this.row() },
                    value
                });
            }

            else if(Tools.IsNotOnlyWhiteSpace(this.column()?.config?.template)) {
                return this.column()?.config?.template as string;
            }
        }

        return this.ApplyFormat()(value, this.column().config?.type || 'string'); 
    }); 


    /** */
    protected _GetTextAlignX = computed<'flex-start' | 'center' | 'flex-end'>(() => {
        switch(this.column()?.config?.textAlignX) {
            case 'left'  : return 'flex-start';
            case 'center': return 'center';
            case 'right' : return 'flex-end';
            default      : return 'flex-start';
        }
    }); 


    /** */
    protected _GetTextBreak = computed<'break-word' | 'keep-all'>(() => {
        return Tools.IsBooleanTrue(this.column().config?.textBreak)
            ? 'break-word' : 'keep-all';
    });


    /** */
    protected _GetSpaceBreak = computed<'nowrap' | 'normal'>(() => {
        return Tools.IsBooleanTrue(this.column().config?.textBreak)
            ? 'normal' : 'nowrap';
    });


    /** */
    protected _switchAttributes = () => { 
        return Tools.IsFunction(this.column().config?.coerSwitch) 
            ? (this.column().config as any)?.coerSwitch({
                indexRow: this.row().indexRow,
                property: this.column().config.property, 
                row:      { ...this.row() }, 
                value:    this.row()[this.column().config.property || ''] 
            }) : null;
    }
}