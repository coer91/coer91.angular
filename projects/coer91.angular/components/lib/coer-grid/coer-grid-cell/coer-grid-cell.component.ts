import { Component, computed, input, output } from '@angular/core';  
import { IGridColumnIndex } from '../interfaces';
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
    public row       = input.required<T>();
    public minHeight = input.required<string>();  
    public isEnabled = input.required<boolean>();

    //Outputs 
    protected onClickRow       = output<T>();
    protected onDoubleClickRow = output<T>();

    /** */
    public get input(): 'coer-switch' | 'coer-textbox' | 'coer-numberbox' | 'coer-selectbox' | 'coer-datebox' | '' {
        

        return '';
    }  


    /** */
    protected _GetCellValue = computed<string>(() => {  
        let value = String((this.row() as any)[this.column().config.property] || ''); 

        //  console.log(this.row())
        //  console.log(this.header().config)

        

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
}