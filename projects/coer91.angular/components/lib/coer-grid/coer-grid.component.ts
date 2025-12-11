import { IGridCheckRow, IGridColumn, IGridColumnIndex, IGridDataSource, IGridFooter, IGridHeaderButton, IGridHeaderButtonAdd, IGridHeaderButtonExport, IGridHeaderButtonImport, IGridHeaderSearch, IGridInputCheckRow, IGridInputEnter, IGridInputImport,  IGridItem,  IGridRowButtonDelete, IGridRowButtonEdit, IGridRowButtonGo, IGridRowButtonModal } from './interfaces';
import { Component, input, AfterViewInit, output, OnDestroy, computed, signal, viewChild } from '@angular/core';
import { CONTROL_VALUE, ControlValue } from 'coer91.angular/tools';
import { Dates, HTMLElements, Tools } from 'coer91.tools';
import { CoerGridHeader } from './coer-grid-header/coer-grid-header.component';

@Component({
    selector: 'coer-grid',
    templateUrl: './coer-grid.component.html', 
    styleUrl: './coer-grid.component.scss',
    providers: [CONTROL_VALUE(CoerGrid)],
    standalone: false
})
export class CoerGrid<T> extends ControlValue implements AfterViewInit, OnDestroy {
    
    //Elements
    protected readonly _coerGridHeader = viewChild<CoerGridHeader<T>>('coerGridHeader');

    //Variables
    protected override _value : T[]     = [];
    protected readonly _valueSIGNAL     = signal<T[]>([]);
    protected readonly _id              = Tools.GetGuid("coer-grid"); 
    protected readonly _searchSIGNAL    = signal<string | number>(''); 
    protected readonly _isLoadingSIGNAL = signal<boolean>(false);
    protected _headerReady: boolean     = false;
    protected _footerReady: boolean     = false;  

    //input
    public readonly columns            = input<IGridColumn<T>[]>([]);
    public readonly search             = input<IGridHeaderSearch>({ show: false }); 
    public readonly headerButtonExport = input<IGridHeaderButtonExport>({ show: false });
    public readonly headerButtonImport = input<IGridHeaderButtonImport>({ show: false });
    public readonly headerButtonAdd    = input<IGridHeaderButtonAdd>({ show: false });
    public readonly headerButtonSave   = input<IGridHeaderButton>({ show: false }); 
    public readonly rowButtonDelete    = input<IGridRowButtonDelete<T>>({});
    public readonly rowButtonEdit      = input<IGridRowButtonEdit<T>>({});
    public readonly rowButtonModal     = input<IGridRowButtonModal<T>>({});
    public readonly rowButtonGo        = input<IGridRowButtonGo<T>>({}); 
    public readonly checkbox           = input<IGridCheckRow>({ show: false }); 
    public readonly footer             = input<IGridFooter>({ show: true });
    public readonly isLoading          = input<boolean>(false); 
    public readonly isReadonly         = input<boolean>(false);
    public readonly isInvisible        = input<boolean>(false);
    public readonly isHidden           = input<boolean>(false);
    public readonly rowsByPage         = input<number>(50);
    public readonly showStriped        = input<boolean>(true);
    public readonly showBorders        = input<boolean>(true);
    public readonly showHover          = input<boolean>(true);
    public readonly width              = input<string>('100%');
    public readonly minWidth           = input<string>('100px');
    public readonly maxWidth           = input<string>('100%');
    public readonly height             = input<string>('350px');
    public readonly minHeight          = input<string>('140px');
    public readonly maxHeight          = input<string>('100vh');
    public readonly marginTop          = input<string>('0px');
    public readonly marginRight        = input<string>('0px');
    public readonly marginBottom       = input<string>('0px');
    public readonly marginLeft         = input<string>('0px'); 

    //output  
    protected readonly onClickExport      = output<T[]>();
    protected readonly onClickImport      = output<IGridInputImport<T>>();
    protected readonly onClickAdd         = output<void>();
    protected readonly onClickSave        = output<void>();
    protected readonly onClickSearch      = output<IGridInputEnter<T>>();
    protected readonly onClickClearSearch = output<IGridInputEnter<T>>();
    protected readonly onKeyupEnter       = output<IGridInputEnter<T>>();
    protected readonly onClickRow         = output<T>();
    protected readonly onDoubleClickRow   = output<T>();
    protected readonly onClickDeleteRow   = output<T>();
    protected readonly onClickEditRow     = output<T>();
    protected readonly onClickModalRow    = output<T>();
    protected readonly onClickGoRow       = output<T>();
    protected readonly onSwitchChange     = output<IGridItem<T>>();
    protected readonly onTextboxChange    = output<IGridItem<T>>();
    protected readonly onNumberboxChange  = output<IGridItem<T>>();
    protected readonly onSelectboxChange  = output<IGridItem<T>>();
    protected readonly onCheckboxChange   = output<IGridInputCheckRow<T>>();
    protected readonly onSort             = output<T[]>();
    protected readonly onDestroy          = output<void>();
    protected onReady                     = output<void>();

    /** Sets the value of the component */
    protected override setValue(value: T[] | null): void {
        if(Tools.IsNull(value)) value = [];

        this._value = [...value!].map((item, index) => ({ checked: false, ...item, indexRow: index })); 
         
        if(typeof this._UpdateValue === 'function')  {
            this._UpdateValue(this._value); 
        } 

        this._valueSIGNAL.set(this._value);   
    }


    //ControlValueAccessor
    protected _SetValueInput(row: IGridItem<T>, input: 'coerSwitch' | 'coerTextbox' | 'coerNumberbox' | 'coerSelectbox'): void {  
        if(Tools.IsNotNull(this._value[row.indexRow])) {            
            (this._value[row.indexRow] as any)[row.property] = row.value;
            
            Tools.Sleep(1500, `${this._id}-${row.property}-${row.indexRow}`).then(() => { 
                this._valueSIGNAL.set(this._value);
                this._value = [...this._value];
                
                if(typeof this._UpdateValue === 'function')  {
                   this._UpdateValue(this._value); 
                }
            });

            switch(input) { 
                case 'coerSwitch'   : this.onSwitchChange.emit(row);    break;
                case 'coerTextbox'  : this.onTextboxChange.emit(row);   break;
                case 'coerNumberbox': this.onNumberboxChange.emit(row); break;
                case 'coerSelectbox': this.onSelectboxChange.emit(row); break;
            }
        }  
    }


    //ControlValueAccessor
    protected _SetSelectedValue(value: T[]): void {   
        this._value = [...value]; 
        this._valueSIGNAL.set(this._value);

        if(typeof this._UpdateValue === 'function')  {
            this._UpdateValue(this._value); 
        }  
    }


    //AfterViewInit
    async ngAfterViewInit() {
        await Tools.Sleep();  
        this.onReady?.emit();
    }


    //OnDestroy
    ngOnDestroy() {  
        this.onReady = null as any;       
        this.onDestroy.emit();
    }  


    //computed
    protected _columns = computed<IGridColumnIndex<T>[]>(() => {
        const COLUMNS = this.columns().length > 0
            ? new Set<string>(this.columns().map(item => item.property).filter(x => !['indexRow', 'checked'].includes(x)))
            : new Set<string>(Tools.GetPropertyList(this._valueSIGNAL()[0]).filter(x => !['indexRow', 'checked'].includes(x)));
         
        return [...COLUMNS].map<IGridColumnIndex<T>>((property, index) => ({
            indexColumn: index,
            property: property, 
            columnName: this._GetColumnName(property),
            config: this._GetColumnConfig(property)!
        }));
    });


    //computed
    protected _dataSource = computed<IGridDataSource[]>(() => {
        const DATA_SOURCE = this._valueFiltered(); 

        //Response
        return DATA_SOURCE.length > 0 ? [{
            groupBy: 'Not Grouped',
            indexGroup: -1,
            length: -1,
            rows: [...DATA_SOURCE].splice(0, this.rowsByPage())
        }] : [];
    });


    //computed
    protected _valueFiltered = computed<T[]>(() => { 
        const DATA_SOURCE = [...this._valueSIGNAL()];
        const SEARCH_TEXT = String(this._searchSIGNAL()).cleanUpBlanks().toUpperCase();

        //Ignore Filter
        if (SEARCH_TEXT.isOnlyWhiteSpace() || Tools.IsBooleanTrue(this.search()?.ignore)) {
            return DATA_SOURCE;
        } 

        //Filter by search   
        const SEARCH_PROPERTIES = Tools.IsNull(this.search().properties) 
            ? this.columns().filter(item => item.property.isNotOnlyWhiteSpace() && Tools.IsNull(item?.coerSwitch)).map(item => item.property)  
            : this.search().properties!.filter(property => property.isNotOnlyWhiteSpace());  

        //Data Formated
        const DATA_SOURCE_FORMAT = (DATA_SOURCE as any[]).map(data => 
            this._columns()
            .map(x => x.config)
            .reduce((item, { property, type }) => ({
                ...item,
                [property]: this._ApplyFormat(data[property], type)
            }), { ...data })
        ).search(SEARCH_TEXT, SEARCH_PROPERTIES);  

        return DATA_SOURCE.intercept(DATA_SOURCE_FORMAT, 'indexRow');
    });


    //getter
    public get selectedValue(): T[] {
        return [...this._value].filter((x: any) => x.checked);
    }


    //computed
    protected _dataSourceExport = computed<T[]>(() => {  
        let DATA_SOURCE = [...this._valueSIGNAL()]; 

        if(Tools.IsBooleanTrue(this.headerButtonExport()?.onlyRowFiltered)) {
            DATA_SOURCE = [...this._valueFiltered()];  
        }

        if (Tools.IsBooleanTrue(this.headerButtonExport()?.onlySelectedItem)) {
            DATA_SOURCE = [...DATA_SOURCE].filter((x: any) => x.checked);
        }
                 
        const COLUMNS = Tools.IsBooleanFalse(this.headerButtonExport()?.onlyColumnFiltered)
            ? Tools.GetPropertyList(DATA_SOURCE[0]).except(['indexRow', 'checked'])
            : this.columns().map(x => (x.property)).except(['indexRow', 'checked']);

        return DATA_SOURCE.map<any>((row: any) =>
            Object.fromEntries(
                COLUMNS.map(property => [this._GetColumnName(property), row[property]])
            )
        );
    });


    //computed
    protected _isEnabled = computed<boolean>(() => {
        return !this.isLoading() && !this.isInvisible() && !this.isReadonly() && !this.isHidden();
    }); 


    /** */
    protected _ApplyFormat = (value: any, type: 'string' | 'number' | 'currency' | 'date' | 'datetime' | 'time' = 'string') => {
        switch(type) {
            case 'string'  : return String(value).cleanUpBlanks();
            case 'number'  : return Number(value).toNumericFormat();
            case 'currency': return Number(value).toCurrency();
            case 'date'    : return Dates.ToFormatDate(value);
            case 'datetime': return Dates.ToFormatDateTime(value, true);
            case 'time'    : return Dates.ToFormatTime(value, true);
        }
    };


    /**  */
    protected _GetColumnName = (property: string): string => {
        const columnConfig = this._GetColumnConfig(property);        

        return Tools.IsNotNull(columnConfig?.alias) 
            ? columnConfig!.alias!
            : property
                .firstCharToLower()
                .replace(/([A-Z])/g, ' $1')    
                .replace(/^\s*/, '')           
                .replace(/^./, x => x.toUpperCase())
                .cleanUpBlanks();   
    }


    //getter
    protected get _heightCompensation(): string { 
        let COMPENSATION = 0;

        //HEADER
        if(this._headerReady) {
            COMPENSATION += this._coerGridHeader()?.marginBottom() 
                ? Number(HTMLElements.GetElementHeight(`#${this._id}-coer-grid-header`).split('px')[0]) + 5 
                : 0;
        } else COMPENSATION += 40;

        //FOOTER
        if(this._footerReady) {
            COMPENSATION += this.footer().show ? 30 : 0; 
        } else COMPENSATION += 30;
         
        return `${COMPENSATION}px`;
    }


    /** */
    protected _GetColumnConfig = (property: string): IGridColumn<T> | null => {
        const COLUMN_CONFIG = this.columns().find(x => x.property.equals(property)) || {} as any; 
        
        let short      = Tools.IsNotNull(COLUMN_CONFIG?.short) ? COLUMN_CONFIG?.short : true;
        let width      = COLUMN_CONFIG?.width      || 'auto';
        let height     = COLUMN_CONFIG?.height     || '20px';
        let textBreak  = Tools.IsNotNull(COLUMN_CONFIG?.textBreak) ? COLUMN_CONFIG?.textBreak : false;
        let textAlignX = COLUMN_CONFIG?.textAlignX || 'left';
        let textAlignY = COLUMN_CONFIG?.textAlignY || 'middle';
        let color      = COLUMN_CONFIG?.color      || 'dark';
        let type       = COLUMN_CONFIG?.type       || 'string';

        //coer-switch
        if(Tools.IsNotNull(COLUMN_CONFIG?.coerSwitch)) {
            if (Tools.IsNull(COLUMN_CONFIG?.short))                short      = false;
            if (Tools.IsOnlyWhiteSpace(COLUMN_CONFIG?.width))      width      = '100px';
            if (Tools.IsOnlyWhiteSpace(COLUMN_CONFIG?.textAlignX)) textAlignX = 'center';
        } 

        return {
            property, 
            ...COLUMN_CONFIG,
            short,
            width,
            height,
            textBreak,
            textAlignX,
            textAlignY,  
            color,
            type
        }  
    }
    

    /** */
    protected _CalculateId = (indexRow: number, indexColumn: number, suffix: string = ''): string => { 
        return `${this._id}${indexRow > -1 ? '-row' + indexRow : ''}${indexColumn > -1 ? '-column' + indexColumn : ''}${suffix.length > 0 ? '-' + suffix : ''}`;
    } 


    /** */
    protected _Add() {
        if(Tools.IsOnlyWhiteSpace(this.headerButtonAdd().path) && !Tools.IsBooleanTrue(this.headerButtonAdd().preventDefault)) {
            let row: any = {}; 

            if(this._valueSIGNAL().length > 0) {
                row = { 
                    ...Object.fromEntries(
                        Tools.GetPropertyList(this._valueSIGNAL()[0]).map(property => [property, null])
                    )
                }
            }

            else if(this.columns().length > 0) { 
                row = { 
                    ...Object.fromEntries(
                        [...this.columns()].map(property => [property, null])
                    )
                }
            }  

            const data: any = ((Tools.IsOnlyWhiteSpace(this.headerButtonAdd().addTo) || this.headerButtonAdd().addTo?.equals('START')) ? [row] : [])
                .concat([...this._valueSIGNAL()])
                .concat(this.headerButtonAdd().addTo?.equals('END') ? [row] : [])

            this.setValue(data);
        }

        this.onClickAdd.emit();
    } 


    /** */
    protected _Import(value: IGridInputImport<T>) {
        this.onClickImport.emit(value);   

        if(value.autofill) {            
            const SET = new Set(value.data.concat(this._valueSIGNAL()).flatMap(item => Tools.GetPropertyList(item)));
            
            const DATA = value.data.concat(this._valueSIGNAL()).map(item => ({
                ...item,
                ...Object.fromEntries(
                    [...SET].filter(x => !Tools.HasProperty(item, x)).map(property => [property, ''])
                )
            }));  
             
            this.setValue(DATA); 
        } 
    } 


    /** */
    protected _DeleteRow(row: any) {
        const SetValue = () => {
            this._isLoadingSIGNAL.set(true);
            const dataSource = [...this._valueSIGNAL()]
            dataSource.splice(row.indexRow, 1);
            this.setValue(dataSource);
            this._isLoadingSIGNAL.set(false);
        }

        if(!Tools.IsBooleanTrue(this.rowButtonDelete().preventDefault)) {  
            if(!Tools.IsBooleanFalse(this.rowButtonDelete().showAlert)) {
                //WARNING here
                SetValue(); 
            }

            else SetValue();
        }

        this.onClickDeleteRow.emit(row);
    } 
}