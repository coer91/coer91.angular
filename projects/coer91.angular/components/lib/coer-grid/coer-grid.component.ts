import { IGridColumn, IGridColumnIndex, IGridDataSource, IGridFooter, IGridHeaderButton, IGridHeaderButtonAdd, IGridHeaderButtonExport, IGridHeaderButtonImport, IGridHeaderSearch, IGridInputEnter, IGridInputImport,  IGridRowButtonDelete, IGridRowButtonEdit, IGridRowButtonGo, IGridRowButtonModal } from './interfaces';
import { Component, input, AfterViewInit, output, OnDestroy, computed, signal, viewChild } from '@angular/core';
import { CONTROL_VALUE, ControlValue } from '@library/tools';
import { HTMLElements, Tools } from 'coer91.tools';
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
    protected _coerGridHeader = viewChild<CoerGridHeader<T>>('coerGridHeader');

    //Variables
    protected override _value : T[] = [];
    protected _valueSIGNAL = signal<T[]>([]);
    protected readonly _id = Tools.GetGuid("coer-grid"); 
    protected readonly _searchSIGNAL = signal<string | number>('');
    protected readonly _isLoadingSIGNAL = signal<boolean>(false);
    protected _headerReady: boolean = false;
    protected _footerReady: boolean = false;  

    //input
    public columns            = input<IGridColumn<T>[]>([]);
    public search             = input<IGridHeaderSearch>({ show: false }); 
    public headerButtonExport = input<IGridHeaderButtonExport>({ show: false });
    public headerButtonImport = input<IGridHeaderButtonImport>({ show: false });
    public headerButtonAdd    = input<IGridHeaderButtonAdd>({ show: false });
    public headerButtonSave   = input<IGridHeaderButton>({ show: false }); 
    public rowButtonDelete    = input<IGridRowButtonDelete<T>>({});
    public rowButtonEdit      = input<IGridRowButtonEdit<T>>({});
    public rowButtonModal     = input<IGridRowButtonModal<T>>({});
    public rowButtonGo        = input<IGridRowButtonGo<T>>({});  
    public footer             = input<IGridFooter>({ show: true });
    public isLoading          = input<boolean>(false); 
    public isReadonly         = input<boolean>(false);
    public isInvisible        = input<boolean>(false);
    public isHidden           = input<boolean>(false);
    public rowsByPage         = input<number>(50);
    public showStriped        = input<boolean>(true);
    public showBorders        = input<boolean>(true);
    public showHover          = input<boolean>(true);
    public width              = input<string>('100%');
    public minWidth           = input<string>('100px');
    public maxWidth           = input<string>('100%');
    public height             = input<string>('350px');
    public minHeight          = input<string>('140px');
    public maxHeight          = input<string>('100vh');
    public marginTop          = input<string>('0px');
    public marginRight        = input<string>('0px');
    public marginBottom       = input<string>('0px');
    public marginLeft         = input<string>('0px'); 

    //output  
    protected onClickExport      = output<T[]>();
    protected onClickImport      = output<IGridInputImport<T>>();
    protected onClickAdd         = output<void>();
    protected onClickSave        = output<void>();
    protected onClickSearch      = output<IGridInputEnter<T>>();
    protected onClickClearSearch = output<IGridInputEnter<T>>();
    protected onKeyupEnterSearch = output<IGridInputEnter<T>>();
    protected onClickRow         = output<T>();
    protected onDoubleClickRow   = output<T>();
    protected onClickDeleteRow   = output<T>();
    protected onClickEditRow     = output<T>();
    protected onClickModalRow    = output<T>();
    protected onClickGoRow       = output<T>();
    protected onReady            = output<void>();
    protected onDestroy          = output<void>();

    /** Sets the value of the component */
    protected override setValue(value: T[] | null): void {
        if(Tools.IsNull(value)) value = [];

        this._value = [...value!].map((item, index) => ({ checked: false, ...item, indexRow: index })); 
         
        if(typeof this._UpdateValue === 'function')  {
            this._UpdateValue(this._value); 
        } 

        this._valueSIGNAL.set(this._value);   
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
        return [{
            groupBy: 'Not Grouped',
            indexGroup: -1,
            length: -1,
            rows: [...DATA_SOURCE].splice(0, this.rowsByPage())
        }];
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
            ? this.columns().map(item => item.property).filter(property => property.isNotOnlyWhiteSpace())  
            : this.search().properties!.filter(property => property.isNotOnlyWhiteSpace());

        return DATA_SOURCE.search(SEARCH_TEXT, SEARCH_PROPERTIES);
    });


    //computed
    protected _dataSourceExport = computed<T[]>(() => {  
        let DATA_SOURCE: T[] = [];
        if (Tools.IsBooleanTrue(this.headerButtonExport()?.onlySelectedItem)) {
            //DATA_SOURCE = this.dataSourceSelected();
        }

        else {
            DATA_SOURCE = Tools.IsBooleanTrue(this.headerButtonExport()?.onlyRowFiltered)
                ? this._valueFiltered() 
                : [...this._valueSIGNAL()];
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

        return {
            property, 
            ...COLUMN_CONFIG,
            width:      COLUMN_CONFIG?.width      || 'auto',
            height:     COLUMN_CONFIG?.height     || '20px',
            textAlignX: COLUMN_CONFIG?.textAlignX || 'left',
            textAlignY: COLUMN_CONFIG?.textAlignY || 'middle',  
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