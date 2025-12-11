import { AfterViewInit, Component, computed, ElementRef, input, OnDestroy, output, viewChild, WritableSignal } from '@angular/core'; 
import { IGridColumn, IGridHeaderButton, IGridHeaderButtonAdd, IGridHeaderButtonExport, IGridHeaderButtonImport, IGridHeaderSearch, IGridInputEnter, IGridInputImport } from '../interfaces';
import { Files, Tools } from 'coer91.tools';

@Component({
    selector: 'coer-grid-header',
    templateUrl: './coer-grid-header.component.html', 
    styleUrl: './coer-grid-header.component.scss',
    standalone: false
})
export class CoerGridHeader<T> implements AfterViewInit, OnDestroy { 
 
    //Elements
    protected readonly _inputFile = viewChild.required<ElementRef>('inputFileRef');

    //Variables 
    protected readonly IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    protected readonly IsBooleanTrue = Tools.IsBooleanTrue; 
    
    //Inputs   
    public readonly CalculateId      = input.required<(indexRow: number, indexColumn: number, suffix?: string) => string>(); 
    public readonly columns          = input.required<IGridColumn<T>[]>();
    public readonly valueSIGNAL      = input.required<T[]>();
    public readonly dataSourceExport = input.required<T[]>();
    public readonly exportButton     = input.required<IGridHeaderButtonExport>();
    public readonly importButton     = input.required<IGridHeaderButtonImport>();
    public readonly addButton        = input.required<IGridHeaderButtonAdd>();
    public readonly saveButton       = input.required<IGridHeaderButton>();
    public readonly search           = input.required<IGridHeaderSearch>();
    public readonly searchSIGNAL     = input.required<WritableSignal<string | number>>();
    public readonly isLoadingSIGNAL  = input.required<WritableSignal<boolean>>();
    public readonly isLoading        = input.required<boolean>();
    public readonly isReadonly       = input.required<boolean>(); 
    
    //Outputs
    protected readonly onClickExport      = output<T[]>();
    protected readonly onClickImport      = output<IGridInputImport<T>>();
    protected readonly onClickAdd         = output<void>();
    protected readonly onClickSave        = output<void>();
    protected readonly onClickSearch      = output<IGridInputEnter<T>>();
    protected readonly onClickClearSearch = output<IGridInputEnter<T>>();
    protected readonly onKeyupEnterSearch = output<IGridInputEnter<T>>();  
    protected readonly onDestroy          = output<void>(); 
    protected onReady                     = output<void>();

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
    public marginBottom = computed<boolean>(() => {
        return this._showExportButton()
            || this.importButton().show 
            || this.addButton().show
            || this.saveButton().show
            || this.search().show
    }); 

    //computed  
    protected _showAddButton = computed(() => {  
        return this.addButton().show 
            && !Tools.IsBooleanTrue(this.addButton().isReadonly)     
            && !(!Tools.IsBooleanFalse(this.addButton().preventDefault) && this.columns().length <= 0 && this.valueSIGNAL().length <= 0)       
    });


    //computed  
    protected _showSaveButton = computed(() => {
        return this.saveButton().show && !Tools.IsBooleanTrue(this.saveButton().isReadonly) && !this.isReadonly();
    });


    //computed  
    protected _showImportButton = computed(() => {
        return this.importButton().show && !Tools.IsBooleanTrue(this.importButton().isReadonly && !this.isReadonly());
    }); 


    //computed  
    protected _showExportButton = computed(() => {
        return this.exportButton().show && !Tools.IsBooleanTrue(this.exportButton().isReadonly && this.dataSourceExport().length > 0);
    }); 
 

    //computed  
    protected _isLoadingInner = computed(() => {
        return this.isLoadingSIGNAL()() || this.isLoading();
    });


    /** */
    protected _Export(): void { 
        if (Tools.IsNotOnlyWhiteSpace(this.exportButton()?.path)) this.Export(false);            
        else this.Export(!Tools.IsBooleanTrue(this.exportButton()?.preventDefault));
    }
    

    /** */
    public async Export(exportFile: boolean = true): Promise<void> {  
        this.isLoadingSIGNAL().set(true);
        const FILE_NAME = (Tools.IsNotOnlyWhiteSpace(this.exportButton()?.fileName) ? this.exportButton()?.fileName : 'COER_Report') + '.xlsx'; 

        //Export File
        if (exportFile) {
            Files.ExportExcel(this.dataSourceExport(), FILE_NAME);
            this.onClickExport.emit(this.dataSourceExport()); 
            await Tools.Sleep(2500);
        } 

        else this.onClickExport.emit(this.dataSourceExport()); 
               
        this.isLoadingSIGNAL().set(false);
    } 


    /** */
    public Import = () => this._Import(null);


    /** */
    protected async _Import(event: any = null): Promise<void> {
        try {
            if (Tools.IsBooleanTrue(this.importButton().preventDefault) || Tools.IsNotOnlyWhiteSpace(this.importButton().path)) {
                this.onClickImport.emit({ data: [], file: null, autofill: false });
                return;
            }

            if (event === null) {
                this._inputFile().nativeElement.value = [];
                this._inputFile().nativeElement.click();
                this.isLoadingSIGNAL().set(true);
                return;
            }

            else if (event.target!.files.length > 0) {  
                const [selectedFile] = event.target.files as File[];

                if(Files.IsExcel(selectedFile)) {
                    const { rows } = await Files.ReadExcel<T>(selectedFile);  
                
                    this.onClickImport.emit({ 
                        data: rows, 
                        file: selectedFile, 
                        autofill: rows.length > 0 && !Tools.IsBooleanFalse(this.importButton().Autofill)
                    });
                }

                else {
                    let message = 'Allowed extensions:';
                    for(const extension of Files.EXCEL_EXTENSIONS) {
                        message += ` <b>${extension}</b>,`
                    }

                    message = message.substring(0, message.length - 1);
                    //         this._alert.Warning(message, 'Invalid File Type', 'bi bi-filetype-xlsx fa-lg');
                    console.warn(message);
                }

                this._inputFile().nativeElement.value = [];
                Tools.Sleep(1000).then(() => this.isLoadingSIGNAL().set(false));
            }    
        } 

        catch (error) {
            console.error(`coer-grid: ${error}`);
        }
    }  
}