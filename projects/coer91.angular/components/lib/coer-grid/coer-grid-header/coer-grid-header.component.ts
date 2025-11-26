import { Component, computed, ElementRef, input, output, viewChild, WritableSignal } from '@angular/core'; 
import { IGridHeaderButton, IGridHeaderButtonExport, IGridHeaderButtonImport, IGridInputEnter, IGridInputImport, IGridSearch } from '../interfaces';
import { Files, Tools } from 'coer91.tools';

@Component({
    selector: 'coer-grid-header',
    templateUrl: './coer-grid-header.component.html', 
    styleUrl: './coer-grid-header.component.scss',
    standalone: false
})
export class CoerGridHeader<T> { 
 
    //Elements
    protected readonly _inputFile = viewChild.required<ElementRef>('inputFileRef');

    //Variables 
    protected readonly IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    protected readonly IsBooleanTrue = Tools.IsBooleanTrue; 
    
    //Inputs 
    public CalculateId      = input.required<(indexRow: number, indexColumn: number, suffix?: string) => string>();
    public dataSourceExport = input.required<T[]>();
    public exportButton     = input.required<IGridHeaderButtonExport>();
    public importButton     = input.required<IGridHeaderButtonImport>();
    public addButton        = input.required<IGridHeaderButton>();
    public saveButton       = input.required<IGridHeaderButton>();
    public search           = input.required<IGridSearch>();
    public searchSIGNAL     = input.required<WritableSignal<string | number>>();
    public isLoadingSIGNAL  = input.required<WritableSignal<boolean>>();
    public isLoading        = input.required<boolean>();
    public isReadonly       = input.required<boolean>(); 
    
    //Outputs
    protected onClickExport      = output<T[]>();
    protected onClickImport      = output<IGridInputImport<T>>();
    protected onClickAdd         = output<void>();
    protected onClickSave        = output<void>();
    protected onClickClearSearch = output<string | number>();
    protected onKeyupEnterSearch = output<IGridInputEnter<T>>();


    //computed
    public _marginBottom = computed(() => {
        return this._showExportButton()
            || this.importButton().show 
            || this.addButton().show
            || this.saveButton().show
            || this.search().show
    }); 


    //computed  
    protected _showExportButton = computed(() => {
        return this.exportButton().show && this.dataSourceExport().length > 0 && !Tools.IsBooleanTrue(this.exportButton().isReadonly);
    });


    //computed  
    protected _showImportButton = computed(() => {
        return this.importButton().show && !this.isReadonly() && !Tools.IsBooleanTrue(this.importButton().isReadonly);
    });


    //computed  
    protected _showAddButton = computed(() => {
        return this.addButton().show && !this.isReadonly() && !Tools.IsBooleanTrue(this.addButton().isReadonly);
    });


    //computed  
    protected _showSaveButton = computed(() => {
        return this.saveButton().show && !this.isReadonly() && !Tools.IsBooleanTrue(this.saveButton().isReadonly);
    });


    //computed  
    protected _isLoadingInner = computed(() => {
        return this.isLoadingSIGNAL()() || this.isLoading();
    });


    /** */
    protected _Export(): void {
        this.Export(Tools.IsNull(this.exportButton()?.preventDefault) || Tools.IsBooleanFalse(this.exportButton()?.preventDefault));
    }
    

    /** */
    public async Export(exportFile: boolean = true): Promise<void> {  
        this.isLoadingSIGNAL().set(true);
        const FILE_NAME = (Tools.IsNotOnlyWhiteSpace(this.exportButton()?.fileName) ? this.exportButton()?.fileName : 'COER_Report') + '.xlsx'; 

        //Export File
        if (exportFile) {
            Files.ExportExcel(this.dataSourceExport(), FILE_NAME);
            await Tools.Sleep(2500);
        }

        this.onClickExport.emit(this.dataSourceExport());        
        this.isLoadingSIGNAL().set(false);
    } 


    /** */
    public Import = () => this._Import(null);


    /** */
    protected async _Import(event: any = null): Promise<void> {
        if (Tools.IsBooleanTrue(this.importButton().preventDefault)) {
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

                if (Tools.IsNull(this.importButton()?.Autofill) || Tools.IsBooleanTrue(this.importButton().Autofill)) { 
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
                //         this._alert.Warning(message, 'Invalid File Type', 'bi bi-filetype-xlsx fa-lg');
                console.warn(message);
            }

            this._inputFile().nativeElement.value = [];
            Tools.Sleep(1000).then(() => this.isLoadingSIGNAL().set(false));
        }
    } 
}