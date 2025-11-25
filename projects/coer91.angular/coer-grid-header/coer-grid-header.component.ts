import { IGridHeader, IGridHeaderButton, IGridHeaderExportButton, IGridHeaderImportButton, IGridImport, IGridKeyupEnter, IGridSearch } from 'coersystem/interfaces';
import { AfterViewInit, Component, computed, ElementRef, inject, input, output, signal, viewChild } from '@angular/core';
import { CoerTextBox } from '../../../lib/coer-textbox/coer-textbox.component';
import { CoerAlert, Collections, Files, HTMLElements, Strings, Tools } from 'coersystem/tools';

@Component({
    selector: 'coer-grid-header',
    templateUrl: './coer-grid-header.component.html', 
    standalone: false
})
export class CoerGridHeader<T> implements AfterViewInit { 

    //Injections
    protected readonly _alert = inject(CoerAlert);

    //Elements
    protected readonly _inputFile = viewChild.required<ElementRef>('inputFileRef');
    protected readonly _inputSearch = viewChild.required<CoerTextBox>('inputSearch');
    protected _header:        HTMLElement | null = null;
    protected _headerButtons: HTMLElement | null = null; 
    protected _headerSlots:   HTMLElement | null = null; 

    //Variables
    protected readonly _isLoadingInner = signal<boolean>(false);

    //Callback
    public GetIdCalculated = input.required<(indexRow: number, indexColumn: number, suffix: string) => string>();
    public GetColumnName   = input.required<(columnName: string) => string>();
    
    //Inputs 
    public columns            = input<IGridHeader<T>[]>([]);
    public dataSource         = input<T[]>([]);
    public dataSourceFiltered = input<T[]>([]);
    public dataSourceSelected = input<T[]>([]);
    public exportButton       = input<IGridHeaderExportButton>({ show: false });
    public importButton       = input<IGridHeaderImportButton>({ show: false });
    public addButton          = input<IGridHeaderButton>({ show: false });
    public saveButton         = input<IGridHeaderButton>({ show: false });
    public search             = input<IGridSearch>({ show: false, ignore: false });
    public searchInner        = input<string | number>('');
    public isLoadingInner     = input<boolean>(false);
    public isLoading          = input<boolean>(false);
    public isDisabled         = input<boolean>(false);
    public isReadonly         = input<boolean>(false);
    public isInvisible        = input<boolean>(false);
    
    //Outputs
    public onClickExport = output<T[]>();
    public onClickImport = output<IGridImport<T>>();
    public onClickAdd    = output<void>();
    public onClickSave   = output<void>();
    public onInputSearch = output<string | number>();
    public onClickClearSearch = output<string | number>();
    public onKeyupEnterSearch = output<IGridKeyupEnter>();

    
    ngAfterViewInit() {
        Tools.Sleep().then(_ => {
            this._header        = HTMLElements.GetElement(`#${this.GetIdCalculated()(-1, -1, 'header')}`); 
            this._headerSlots   = HTMLElements.GetElement(`#${this.GetIdCalculated()(-1, -1, 'header-slots')}`); 
            this._headerButtons = HTMLElements.GetElement(`#${this.GetIdCalculated()(-1, -1, 'header-buttons')}`);
        });
    } 


    //getter
    public get heigth(): number { 
        return Number(HTMLElements.GetElementHeight(this._header, this._marginBottom).split('px')[0]);
    }


    //getter
    protected get _marginBottom(): number {
        return this.search().show
            || HTMLElements.HasChildren(this._headerButtons)
            || HTMLElements.HasChildren(this._headerSlots)
            ? 10 : 0;
    }


    //computed
    public _dataSourceExport = computed<T[]>(() => {   

        //Get Data
        let DATA_SOURCE: T[] = [];
        if (Tools.IsBooleanTrue(this.exportButton()?.onlySelectedItem)) {
            DATA_SOURCE = this.dataSourceSelected();
        }

        else {
            DATA_SOURCE = (Tools.IsBooleanTrue(this.exportButton()?.onlyRowFiltered))
                ? this.dataSourceFiltered() : this.dataSource();
        }
         
        //Get Columns
        let DATA_SOURCE_COLUMNS = new Set<string>();
        if (Tools.IsBooleanFalse(this.exportButton()?.onlyColumnFiltered)) {
            for (const row of this.dataSource()) {
                for (const property in row) {
                    if (property == 'indexRow') continue;
                    DATA_SOURCE_COLUMNS.add(Strings.FirstCharToLower(property));
                }
            }
        }

        else {
            DATA_SOURCE_COLUMNS = new Set(Collections.Except(this.columns().map(x => Strings.FirstCharToLower(x.property)), ['indexRow', 'checked']));
        }

        //Export Data
        let item: any = {};
        const DATA_SOURCE_EXPORT: T[] = [];
        for (const row of DATA_SOURCE) {
            for (const property of DATA_SOURCE_COLUMNS) {
                item = Object.assign(item, { [this.GetColumnName()(property)]: (row as any)[property] });
            }

            DATA_SOURCE_EXPORT.push(item);
            item = Tools.BreakReference({});
        }

        return DATA_SOURCE_EXPORT;
    });
    
    
    //computed  
    protected _showExportButton = computed(() => {
        return this.exportButton().show && this._dataSourceExport().length > 0;
    });


    /** */
    protected _GetPath = (button: IGridHeaderExportButton) => {
        return Tools.IsNotOnlyWhiteSpace(button?.path) ? button.path! : [];
    }


    /** */  
    protected _ColorButton = (button: IGridHeaderButton | IGridHeaderImportButton | IGridHeaderExportButton) => {
        return Tools.IsNotOnlyWhiteSpace(button?.color) ? button.color! : 'primary'; 
    }


    /** */  
    protected _TooltipButton = (button: IGridHeaderButton | IGridHeaderImportButton | IGridHeaderExportButton, tooltip: string) => {
        return Tools.IsNotOnlyWhiteSpace(button?.tooltip) ? button.tooltip! : tooltip;
    }


    /** */  
    protected _IsDisabled = (element: IGridHeaderButton | IGridHeaderImportButton | IGridHeaderExportButton | IGridSearch) => {
        return (Tools.IsNotNull(element?.isDisabled) ? element.isDisabled! : false);
    }


    /** Export button */  
    protected _IsDisabledExportButton = () => {
        return this._IsDisabled(this.exportButton()) || this._isLoadingInner() || this.isLoadingInner() || this.isLoading() || this.isDisabled() || this.isInvisible();
    }


    /** Import button */  
    protected _IsDisabledImportButton = () => {
        return this._IsDisabled(this.importButton()) || this._isLoadingInner() || this.isDisabled() || this.isInvisible();
    }


    /** Add button */  
    protected _IsDisabledAddButton = () => {
        return this._IsDisabled(this.addButton()) || this._isLoadingInner() || this.isDisabled() || this.isInvisible();
    }


    /** Save button */  
    protected _IsDisabledSaveButton = () => {
        return this._IsDisabled(this.saveButton()) || this._isLoadingInner() || this.isLoadingInner() || this.isLoading() || this.isDisabled() || this.isInvisible();
    }


    /** Search */  
    protected _IsDisabledSearch = () => {
        return this._IsDisabled(this.search()) || this._isLoadingInner() || this.isLoading() || this.isDisabled() || this.isInvisible();
    } 


    /** */
    public FocusSearch(select: boolean = false, delay: number = 0): void {
        if(Tools.IsNotNull(this._inputSearch())) { 
            this._inputSearch().Focus(select, delay);
        }    
    }  


    /** */
    protected _Export(): void {
        this.Export(Tools.IsNull(this.exportButton()?.preventDefault) || this.exportButton()?.preventDefault === false);
    }
    

    /** */
    public async Export(exportFile: boolean = true): Promise<void> {  
        this._isLoadingInner.set(true);
        const FILE_NAME = (Tools.IsNotOnlyWhiteSpace(this.exportButton()?.fileName) ? this.exportButton()?.fileName : 'COER_Report') + '.xlsx'; 

        //Export File
        if (exportFile) {
            Files.ExportExcel(this._dataSourceExport(), FILE_NAME);
            await Tools.Sleep(3000);
        }

        this.onClickExport.emit(this._dataSourceExport());        
        this._isLoadingInner.set(false);
    } 


    /** */
    public async Import(event: any = null): Promise<void> {
        if (Tools.IsNotNull(this.importButton()?.preventDefault) && this.importButton().preventDefault) {
            this.onClickImport.emit({ data: [], file: null, autofill: false });
            return;
        }

        if (!this.isReadonly() && event === null) {
            this._inputFile().nativeElement.value = null;
            this._inputFile().nativeElement.click();
            this._isLoadingInner.set(true);
            return;
        }

        else if (!this.isReadonly() && event.target!.files.length > 0) {  
            const [selectedFile] = event.target.files as File[];

            if(Files.IsExcel(selectedFile)) {
                const { rows } = await Files.ReadExcel<T>(selectedFile);

                if (Tools.IsNull(this.importButton()?.Autofill) || this.importButton().Autofill) { 
                    this.onClickImport.emit({ data: rows, file: selectedFile, autofill: true });
                }

                else {
                    this.onClickImport.emit({ data: rows, file: selectedFile, autofill: false });
                }
            }

            else {
                let message = 'Allowed extensions:';
                for(const extension of Files.EXCEL_EXTENSIONS) {
                    message += ` <b>${extension}</b>,`
                }

                message = message.substring(0, message.length - 1);
                this._alert.Warning(message, 'Invalid File Type', 'bi bi-filetype-xlsx fa-lg');
            }

            this._inputFile().nativeElement.value = null;
            Tools.Sleep(1000).then(() => this._isLoadingInner.set(false));
        }
    } 
}