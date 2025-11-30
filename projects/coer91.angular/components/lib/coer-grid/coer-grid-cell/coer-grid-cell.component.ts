import { Component, computed, input, output } from '@angular/core';  
import { IGridColumnIndex, IGridItem } from '../interfaces';
import { Tools } from 'coer91.tools';

@Component({
    selector: 'coer-grid-cell',
    templateUrl: './coer-grid-cell.component.html',
    styleUrl: './coer-grid-cell.component.scss',
    standalone: false
})
export class CoerGridCell<T> {

    //Elements   

    //Inputs 
    public id        = input.required<string>();
    public column    = input.required<IGridColumnIndex<T>>();
    public row       = input.required<any>();
    public minHeight = input.required<string>();  
    public isEnabled = input.required<boolean>();
    public isLoading = input.required<boolean>();

    //Outputs 
    protected onSwitchChange   = output<IGridItem<T>>();
    protected onClickRow       = output<T>();
    protected onDoubleClickRow = output<T>();

    /** */
    public get input(): 'coer-switch' | 'coer-textbox' | 'coer-numberbox' | 'coer-selectbox' | 'coer-datebox' | '' {
        if(this.isEnabled() && Tools.IsNull(this.column().config?.template)) {
            if(this._switchAttributes()?.showInput) {
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
        let value = String((this.row() as any)[this.column().config.property] || ''); 
        
        //Template
        if(Tools.IsNotNull(this.column().config?.template)) {  
            if(Tools.IsFunction(this.column()?.config?.template)) {
                value = (this.column()?.config as any)?.template({
                    indexRow: this.row().indexRow,
                    property: this.column()?.config?.property,
                    row: { ...this.row() },
                    value: value
                });
            }

            else if(Tools.IsNotOnlyWhiteSpace(this.column()?.config?.template)) {
                value = this.column()?.config?.template as string;
            }
        }

        return value.trim();
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