import { Tools } from 'coer91.tools';
import { IGridDataSource, IGridColumnIndex, IGridRowButtonDelete, IGridRowButtonEdit, IGridRowButtonModal, IGridItem, IGridRowButtonGo } from '../interfaces';
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
    public buttonDelete    = input.required<IGridRowButtonDelete<T>>(); 
    public buttonEdit      = input.required<IGridRowButtonEdit<T>>(); 
    public buttonModal     = input.required<IGridRowButtonModal<T>>(); 
    public buttonGo        = input.required<IGridRowButtonGo<T>>(); 
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
    protected _ShowDeleteButton(row: any = null) {
        let response = false;

        if(this.isEnabled() && !this.isLoading()) {
            if (Tools.IsNull(row)) {
                response = Tools.IsBoolean(this.buttonDelete().show) ? Boolean(this.buttonDelete().show) : true;
            }

            else if (Tools.IsBoolean(this.buttonDelete().show)) {
                response = Boolean(this.buttonDelete().show);
            }

            else if (Tools.IsFunction(this.buttonDelete().show)) {
                const show = this.buttonDelete().show as ((item: IGridItem<T>) => boolean);
                response = show({ indexRow: row.indexRow, property: 'rowButtonDelete', row, value: null });
            }
        } 

        return response;  
    }


    /** */
    protected _ShowEditButton(row: any = null) {
        let response = false;

        if(this.isEnabled() && !this.isLoading()) {
            if (Tools.IsNull(row)) {
                response = Tools.IsBoolean(this.buttonEdit().show) ? Boolean(this.buttonEdit().show) : true;
            }

            else if (Tools.IsBoolean(this.buttonEdit().show)) {
                response = Boolean(this.buttonEdit().show);
            }

            else if (Tools.IsFunction(this.buttonEdit().show)) {
                const show = this.buttonEdit().show as ((item: IGridItem<T>) => boolean);
                response = show({ indexRow: row.indexRow, property: 'rowButtonEdit', row, value: null });
            }
        } 

        return response;  
    } 


    /** */
    protected _ShowModalButton(row: any = null) {
        let response = false; 

        if(!this.isLoading() && this.dataSource().length > 0) {
            if (Tools.IsNull(row)) {
                response = Tools.IsBoolean(this.buttonModal().show) ? Boolean(this.buttonModal().show) : true;
            }

            else if (Tools.IsBoolean(this.buttonModal().show)) {
                response = Boolean(this.buttonModal().show);
            }

            else if (Tools.IsFunction(this.buttonModal().show)) {
                const show = this.buttonModal().show as ((item: IGridItem<T>) => boolean);
                response = show({ indexRow: row.indexRow, property: 'rowButtonModal', row, value: null });
            }
        } 

        return response;  
    } 


    /** */
    protected _ShowGoButton(row: any = null) {
        let response = false; 

        if(!this.isLoading() && this.dataSource().length > 0) {
            if (Tools.IsNull(row)) {
                response = Tools.IsBoolean(this.buttonGo().show) ? Boolean(this.buttonGo().show) : true;
            }

            else if (Tools.IsBoolean(this.buttonGo().show)) {
                response = Boolean(this.buttonGo().show);
            }

            else if (Tools.IsFunction(this.buttonGo().show)) {
                const show = this.buttonGo().show as ((item: IGridItem<T>) => boolean);
                response = show({ indexRow: row.indexRow, property: 'rowButtonGo', row, value: null });
            }
        } 

        return response;  
    }  


    /** */
    protected _GetPath = (row: any): string => { 
        if(Tools.IsFunction(this.buttonGo().path) && !Tools.IsBooleanTrue(this.buttonGo().preventDefault)) { 
            const path = this.buttonGo().path as ((item: IGridItem<T>) => string);
            return path({ indexRow: row.indexRow, property: 'rowButtonGo', row, value: null });
        }

        return '';
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