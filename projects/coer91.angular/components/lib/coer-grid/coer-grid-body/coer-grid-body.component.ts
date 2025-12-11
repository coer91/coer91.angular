import { IGridDataSource, IGridColumnIndex, IGridRowButtonDelete, IGridRowButtonEdit, IGridRowButtonModal, IGridItem, IGridRowButtonGo, IGridCheckRow, IGridInputCheckRow, IGridSort, IGridHeaderSearch, IGridColumn, IGridInputEnter } from '../interfaces';
import { Component, computed, input, output, signal, WritableSignal } from '@angular/core'; 
import { Dates, Tools } from 'coer91.tools';


@Component({
    selector: 'coer-grid-body',
    templateUrl: './coer-grid-body.component.html', 
    styleUrl: './coer-grid-body.component.scss',
    standalone: false
})
export class CoerGridBody<T> {

    //Variables
    protected readonly IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    protected readonly _sort = signal<IGridSort>({ property: '', direction: 'none', icon: '' });
    protected _isLoadingSort: boolean = false;
    protected _checkAll: boolean = false;

    //Elements 
    
    //Inputs  
    public readonly CalculateId     = input.required<(indexRow: number, indexColumn: number, suffix?: string) => string>();
    public readonly ApplyFormat     = input.required<(value: any, type: 'string' | 'number' | 'currency' | 'date' | 'datetime' | 'time') => string>();
    public readonly columns         = input.required<IGridColumnIndex<T>[]>();
    public readonly valueSIGNAL     = input.required<T[]>();
    public readonly dataSource      = input.required<IGridDataSource[]>();
    public readonly search          = input.required<IGridHeaderSearch>(); 
    public readonly searchSIGNAL    = input.required<string | number>();
    public readonly buttonDelete    = input.required<IGridRowButtonDelete<T>>(); 
    public readonly buttonEdit      = input.required<IGridRowButtonEdit<T>>(); 
    public readonly buttonModal     = input.required<IGridRowButtonModal<T>>(); 
    public readonly buttonGo        = input.required<IGridRowButtonGo<T>>(); 
    public readonly checkbox        = input.required<IGridCheckRow>(); 
    public readonly showStriped     = input.required<boolean>();
    public readonly showBorders     = input.required<boolean>();
    public readonly showHover       = input.required<boolean>(); 
    public readonly isLoadingSIGNAL = input.required<WritableSignal<boolean>>();  
    public readonly isEnabled       = input.required<boolean>();   

    //Outputs
    protected readonly onClickRow        = output<T>();
    protected readonly onDoubleClickRow  = output<T>();
    protected readonly onClickDeleteRow  = output<T>();
    protected readonly onClickEditRow    = output<T>();
    protected readonly onClickModalRow   = output<T>();
    protected readonly onClickGoRow      = output<T>();
    protected readonly onSwitchChange    = output<IGridItem<T>>();
    protected readonly onCheckboxChange  = output<IGridInputCheckRow<T>>();
    protected readonly onTextboxChange   = output<IGridItem<T>>();
    protected readonly onNumberboxChange = output<IGridItem<T>>();
    protected readonly onSelectboxChange = output<IGridItem<T>>();
    protected readonly onKeyupEnter      = output<IGridInputEnter<T>>();
    protected readonly onSelectedValue   = output<T[]>();
    protected readonly onSort            = output<T[]>();

    //computed  
    protected isLoading = computed(() => this.isLoadingSIGNAL()());  


    //computed
    protected _showCheckbox = computed(() => {
        return this.checkbox().show && !this.isLoading() && this.isEnabled() && this.dataSource().length > 0;
    });


    //getter
    protected get _isInvisibleCheckboxAll(): boolean { 
        return this.checkbox()?.onlyOneCheck === true || !this.isEnabled() || this.isLoading(); 
    } 


    /** */
    protected _ShowDeleteButton(row: any = null) {
        let response = false;

        if(this.isEnabled() && !this.isLoading() && this.dataSource().length > 0) {
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

        if(this.isEnabled() && !this.isLoading() && this.dataSource().length > 0) {
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


    //compute 
    protected _checkOnRow = computed<boolean>(() => {
        return this.checkbox().show && this.isEnabled() && Tools.IsBooleanTrue(this.checkbox().checkOnRow);
    });


    /** */
    protected _ClickOnRow(row: T): void { 
        if(!this.isEnabled()) return;

        if(this._checkOnRow()) {
            this.CheckBy((x: any) => x.indexRow == (row as any).indexRow);
        }

        this.onClickRow.emit(row);
    } 


    /** */
    protected async _ClickCheckAll(checked: boolean): Promise<void> {   
        const SELECTED_VALUE = [...this.valueSIGNAL()].map(item => ({ ...item, checked }));

        this.onSelectedValue.emit(SELECTED_VALUE);           
    
        //Event
        this.onCheckboxChange.emit({ 
            all: true,
            checked,
            rows: [...SELECTED_VALUE]
        });              
    } 


    /** */
    protected _ClickCheck(checked: boolean, row: any): void { 
        if(checked) this.CheckBy((x: any) => x.indexRow == row.indexRow);
        else this.UncheckBy((x: any) => x.indexRow == row.indexRow);
    }


    /** */
    public CheckBy(callback: (row: T) => boolean): void { 
        if(this.checkbox().show) {   

            let SELECTED_VALUE: T[];
            if(Tools.IsBooleanTrue(this.checkbox()?.onlyOneCheck)) {  
                const CHECKBOX = this.valueSIGNAL().find(callback) as any;  
                SELECTED_VALUE = this.valueSIGNAL().map((item: any) => ({ ...item, checked: (item.indexRow == CHECKBOX.indexRow) }));   
            }

            else {
                SELECTED_VALUE = this.valueSIGNAL().map((item) => callback(item) ? { ...item, checked: true } : item);  
            }

            this.onSelectedValue.emit(SELECTED_VALUE);
             
            //Mark All checkbox
            this._checkAll = SELECTED_VALUE.every((x: any) => x.checked); 
            
            //Event Checkbox Change
            this.onCheckboxChange.emit({ 
                all: false, 
                checked: true, 
                rows: [ ...SELECTED_VALUE.filter(callback) ] 
            });   
        }
    } 


    /** */
    public UncheckBy(callback: (row: T) => boolean): void {
        if(this.checkbox().show) {  
            const SELECTED_VALUE = this.valueSIGNAL().map((item) => callback(item) ? { ...item, checked: false } : item); 
            this.onSelectedValue.emit(SELECTED_VALUE);     
 
            this._checkAll = SELECTED_VALUE.every((x: any) => x.checked);

            this.onCheckboxChange.emit({ 
                all: false, 
                checked: false, 
                rows: [ ...SELECTED_VALUE.filter(callback) ] 
            }); 
        }
    } 


    /** */
    protected _IconSearchHeader = (column: IGridColumn<T>) => { 
        return this.search().show 
            && !Tools.IsBooleanTrue(this.search()?.ignore)
            && Tools.IsNotOnlyWhiteSpace(String(this.searchSIGNAL()))
            && Tools.IsNull(column?.coerSwitch)
            && (Tools.IsNull(this.search()?.properties) || this.search()?.properties!.length <= 0 || this.search().properties?.includes(column.property)) 
            ? 'i91-magnifying-glass' : '';
    }  


    /** */
    protected _IconShortHeader = (property: string) => {
        return this._sort().property.equals(property) ? this._sort().icon : '';
    }


    /** */
    protected async _ToggleSort(column: IGridColumn<T>): Promise<void> {
        
        if (!Tools.IsBooleanFalse(column?.short)) {   
            if(this._isLoadingSort) return;

            this._isLoadingSort = true;
            const { direction } = this._sort(); 

            let DATA_SOURCE = [];
            switch(column?.type) {
                case 'number': {
                    DATA_SOURCE = [...this.valueSIGNAL()].map((item: any) => ({ ...item, [column.property]: Number(item[column.property]) }));
                    break
                }

                case 'currency': {
                    DATA_SOURCE = [...this.valueSIGNAL()].map((item: any) => ({ ...item, [column.property]: Number(String(item[column.property]).replace('$', '')) }));
                    break
                }

                case 'date': {
                    DATA_SOURCE = [...this.valueSIGNAL()]
                        .map((item: any) => ({ 
                            ...item, 
                            [column.property]: Dates.IsValidDate(item[column.property]) ? item[column.property] : Dates.ToFormatDB(String(item[column.property])) 
                        }));
                    break
                }

                case 'datetime': {
                    DATA_SOURCE = [...this.valueSIGNAL()]
                        .map((item: any) => ({ 
                            ...item, 
                            [column.property]: Dates.IsValidDate(item[column.property]) ? item[column.property] : Dates.ToFormatDB(String(item[column.property])) 
                        }));
                    break
                }

                case 'time': {
                    DATA_SOURCE = [...this.valueSIGNAL()]
                        .map((item: any) => ({ 
                            ...item, 
                            [column.property]: Dates.IsValidDate(item[column.property]) ? item[column.property] : Dates.ToFormatDB(String(item[column.property])) 
                        }));
                    break
                }

                default: {
                    DATA_SOURCE = [...this.valueSIGNAL()].map((item: any) => ({ ...item, [column.property]: String(item[column.property]) }));
                    break;
                } 
            } 

            if (direction == 'descendant') { 
                this.onSort.emit(DATA_SOURCE.sortAsc(column.property));                 

                this._sort.set({ 
                    property: column.property, 
                    direction: 'ascendant', 
                    icon: 'i91-arrow-down-sort-asc' 
                });
            }

            else {
                this.onSort.emit(DATA_SOURCE.sortDesc(column.property));

                this._sort.set({ 
                    property: column.property, 
                    direction: 'descendant', 
                    icon: 'i91-arrow-down-sort-desc' 
                });
            } 
             
            this._isLoadingSort = false;
        }
    }
}