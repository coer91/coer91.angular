import { Component, computed, input, output } from '@angular/core';  
import { IGridColumnIndex, IGridInputEnter, IGridItem } from '../interfaces';
import { Tools } from 'coer91.tools';

@Component({
    selector: 'coer-grid-cell',
    templateUrl: './coer-grid-cell.component.html',
    styleUrl: './coer-grid-cell.component.scss',
    standalone: false
})
export class CoerGridCell<T> { 

    //Inputs 
    public readonly ApplyFormat = input.required<(value: any, type: 'string' | 'number' | 'currency' | 'date' | 'datetime' | 'time') => string>();
    public readonly id          = input.required<string>();
    public readonly column      = input.required<IGridColumnIndex<T>>();
    public readonly row         = input.required<any>();
    public readonly minHeight   = input.required<string>();  
    public readonly isEnabled   = input.required<boolean>();
    public readonly isLoading   = input.required<boolean>();

    //Outputs 
    protected readonly onSwitchChange    = output<IGridItem<T>>();
    protected readonly onClickRow        = output<T>();
    protected readonly onDoubleClickRow  = output<T>();
    protected readonly onTextboxChange   = output<IGridItem<T>>();
    protected readonly onNumberboxChange = output<IGridItem<T>>();
    protected readonly onSelectboxChange = output<IGridItem<T>>();
    protected readonly onKeyupEnter      = output<IGridInputEnter<T>>(); 
    
    /** */
    public _input = computed<'coerSearch' | 'coerSwitch' | 'coerTextbox' | 'coerNumberbox' | 'coerSelectbox' | 'coerDatebox'>(() => {
        const COLUMN = this.column().config;
        if(this.isEnabled() && Tools.IsNull(COLUMN?.template)) {
            if(this._ShowInput(COLUMN?.coerSwitch)) {
                return 'coerSwitch';
            }

            else if(this._ShowInput(COLUMN?.coerTextbox)) {
                return 'coerTextbox';
            }

            else if(this._ShowInput(COLUMN?.coerNumberbox)) {
                return 'coerNumberbox';
            }

            else if(this._ShowInput(COLUMN?.coerSelectbox)) {
                return 'coerSelectbox';
            }

            // else if(this._dateboxAttributes()?.showInput) {
            //     return 'coer-datebox';
            // }
        }

        return 'coerSearch';
    })
    
    
    /** */
    private _ShowInput = (propertyFunction: any): boolean => { 
        return Tools.IsBooleanTrue(propertyFunction) 
            ? true 
            : (Tools.IsFunction(propertyFunction) 
                ? propertyFunction({
                    indexRow: this.row().indexRow,
                    property: this.column().config.property, 
                    row:      { ...this.row() }, 
                    value:    this.row()[this.column().config.property] 
                })?.showInput || false 
                : false
            );
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
    protected _GetAttributes = () => { 
        const FUNCTION = (this.column().config as any)[this._input()];            
        return Tools.IsFunction(FUNCTION) 
            ? FUNCTION({
                indexRow: this.row().indexRow,
                property: this.column().config.property, 
                row:      { ...this.row() }, 
                value:    this.row()[this.column().config.property] 
            }) : null;
    } 


    /** */
    protected _GetAttributeValue = (attribute: string, defaultValue: any = null): any => {  
        return Tools.IsNotNull(this._GetAttributes()) 
            ? (Tools.IsNotOnlyWhiteSpace(this._GetAttributes()[attribute]) ? this._GetAttributes()[attribute] : defaultValue)
            : defaultValue;
    }      
}