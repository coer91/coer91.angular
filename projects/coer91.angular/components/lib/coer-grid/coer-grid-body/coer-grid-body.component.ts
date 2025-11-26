import { Tools } from 'coer91.tools';
import { IGridDataSource, IGridColumnIndex, IGridButtonByRow } from '../interfaces';
import { Component, computed, input, output, WritableSignal } from '@angular/core'; 


@Component({
    selector: 'coer-grid-body',
    templateUrl: './coer-grid-body.component.html', 
    styleUrl: './coer-grid-body.component.scss',
    standalone: false
})
export class CoerGridBody<T> {

    //Variables
    protected IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;

    //Elements 
    
    //Inputs  
    public CalculateId     = input.required<(indexRow: number, indexColumn: number, suffix?: string) => string>();
    public columns         = input.required<IGridColumnIndex<T>[]>();
    public dataSource      = input.required<IGridDataSource[]>();
    public buttonByRow     = input.required<IGridButtonByRow<T>>(); 
    public showStriped     = input.required<boolean>();
    public showBorders     = input.required<boolean>();
    public showHover       = input.required<boolean>(); 
    public isLoadingSIGNAL = input.required<WritableSignal<boolean>>(); 
    public isEnabled       = input.required<boolean>();   

    //Outputs
    protected onClickRow       = output<T>();
    protected onDoubleClickRow = output<T>();
    protected onClickDeleteRow = output<T>();
    protected onClickEditRow   = output<T>();
    protected onClickModalRow  = output<T>();
    protected onClickGoRow     = output<T>();

    //computed  
    protected isLoading = computed(() => this.isLoadingSIGNAL()()); 

    /** */
    protected _ShowButtonByRow(property: 'showDeleteButton' | 'showEditButton' | 'showModalButton' | 'showGoButton', data: any = null) {
        let response = false;

        if(!this.isEnabled() && ['showDeleteButton', 'showEditButton'].includes(property)) {
            return response;
        } 

        if(this.isLoading() || this.dataSource().filter(x => x.indexGroup >= 0).length > 0 ) {
            return response;
        }

        const buttonByRow: any = this.buttonByRow();
        const row = Tools.IsNotNull(data) ? { ...data } : null;

        if (buttonByRow.hasOwnProperty(property)) {
            if (row === null) {
                response = (typeof buttonByRow[property] === 'boolean') ? buttonByRow[property] : true;
            }

            else if (typeof buttonByRow[property] === 'boolean') {
                response = buttonByRow[property];
            }

            else if (typeof buttonByRow[property] === 'function') {
                response = buttonByRow[property]({ indexRow: data.indexRow, property, row, value: null });
            }
        } 

        return response;
    }


    /** */
    protected _ClickOnRow(row: T): void { 
        if(!this.isEnabled()) return;
        // if(this._checkOnRow()) {
        //     this.CheckBy((x: any) => x.indexRow == (row as any).indexRow);
        // }

        this.onClickRow.emit(row);
    }
}