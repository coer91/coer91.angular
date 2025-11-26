import { Component, input, AfterViewInit, output, OnDestroy, AfterContentChecked, computed, signal } from '@angular/core';
import { IGridButtonByRow, IGridColumn, IGridColumnIndex, IGridDataSource, IGridHeaderButton, IGridHeaderButtonExport, IGridHeaderButtonImport, IGridSearch } from './interfaces';
import { CONTROL_VALUE, ControlValue } from '@library/tools';
import { Tools } from 'coer91.tools';

@Component({
    selector: 'coer-grid',
    templateUrl: './coer-grid.component.html', 
    styleUrl: './coer-grid.component.scss',
    providers: [CONTROL_VALUE(CoerGrid)],
    standalone: false
})
export class CoerGrid<T> extends ControlValue implements AfterViewInit, OnDestroy, AfterContentChecked {
    
    protected override _value : T[] = [];
    protected _valueSIGNAL = signal<T[]>([]);

    //Variables
    protected readonly _id = Tools.GetGuid("coer-grid"); 
    protected readonly _searchSIGNAL = signal<string | number>('');
    protected readonly _isLoadingSIGNAL = signal<boolean>(false);
    protected _height: string = '0px';
    
    //output  
    protected onClickRow       = output<T>();
    protected onDoubleClickRow = output<T>();
    protected onClickDeleteRow = output<T>();
    protected onClickEditRow   = output<T>();
    protected onClickModalRow  = output<T>();
    protected onClickGoRow     = output<T>();
    protected onReady          = output<void>();
    protected onDestroy        = output<void>();

    //input
    public columns      = input<IGridColumn<T>[]>([]);
    public exportButton = input<IGridHeaderButtonExport>({ show: false });
    public importButton = input<IGridHeaderButtonImport>({ show: false });
    public addButton    = input<IGridHeaderButton>({ show: false });
    public saveButton   = input<IGridHeaderButton>({ show: false });
    public search       = input<IGridSearch>({ show: false }); 
    public buttonByRow  = input<IGridButtonByRow<T>>({});
    public isLoading    = input<boolean>(false);//PENDING 
    public isReadonly   = input<boolean>(false);//PENDING
    public isInvisible  = input<boolean>(false);//PENDING
    public isHidden     = input<boolean>(false);//PENDING
    public rowsByPage   = input<number>(50);
    public showStriped  = input<boolean>(true);
    public showBorders  = input<boolean>(true);
    public showHover    = input<boolean>(true);
    public width        = input<string>('100%');
    public minWidth     = input<string>('100px');
    public maxWidth     = input<string>('100%');
    public height       = input<string>('350px');//PENDING
    public minHeight    = input<string>('140px');//PENDING
    public maxHeight    = input<string>('100vh');//PENDING
    public marginTop    = input<string>('0px');
    public marginRight  = input<string>('0px');
    public marginBottom = input<string>('0px');
    public marginLeft   = input<string>('0px'); 


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

        this.onReady.emit();
    }


    //OnDestroy
    ngOnDestroy() { 
        
        this.onDestroy.emit();
    } 

    //AfterViewChecked
    ngAfterContentChecked() { 
        this._height = this.height(); //= (this.height() == 'full') 
            // ? (Screen.WINDOW_HEIGHT - (
            //     45 //Toolbar
            //     + Screen.BREAKPOINT == 'mv' ? 5 : 15
            //     + (this._coerGridHeader()?.heigth || 0)
            //     + (this._coerGridFooter()?.heigth || 0)
            //     + HTMLElements.GetOffsetTop(this._grid)
            //     + Number(HTMLElements.GetCssValue(this._gridGrandFather, 'padding-top').split('px')[0])
            //     + Number(HTMLElements.GetCssValue(this._gridGrandFather, 'padding-bottom').split('px')[0])
            // ))  + 'px'
            //: this.height();
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
        const DATA_SOURCE = this._dataSourceFiltered();

        //Response
        return [{
            groupBy: 'Not Grouped',
            indexGroup: -1,
            length: -1,
            rows: DATA_SOURCE.splice(0, this.rowsByPage())
        }];
    });


    //computed
    protected _dataSourceFiltered = computed<T[]>(() => { 
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
        if (Tools.IsBooleanTrue(this.exportButton()?.onlySelectedItem)) {
            //DATA_SOURCE = this.dataSourceSelected();
        }

        else {
            DATA_SOURCE = Tools.IsBooleanTrue(this.exportButton()?.onlyRowFiltered)
                ? this._dataSourceFiltered() 
                : [...this._valueSIGNAL()];
        }
                 
        const COLUMNS = Tools.IsBooleanFalse(this.exportButton()?.onlyColumnFiltered)
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
}