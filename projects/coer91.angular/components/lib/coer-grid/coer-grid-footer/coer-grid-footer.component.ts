import { AfterViewInit, Component, computed, input, OnDestroy, output, WritableSignal } from '@angular/core'; 
import { IGridFooter } from '../interfaces';
import { Tools } from 'coer91.tools';

@Component({
    selector: 'coer-grid-footer',
    templateUrl: './coer-grid-footer.component.html', 
    styleUrl: './coer-grid-footer.component.scss',
    standalone: false
})
export class CoerGridfooter<T> implements AfterViewInit, OnDestroy {   

    //Inputs
    public footer          = input.required<IGridFooter>();
    public valueSIGNAL     = input.required<T[]>();
    public valueFiltered   = input.required<T[]>();
    public selectedValue   = input.required<T[]>(); 
    public searchSIGNAL    = input.required<string | number>(); 
    public isLoadingSIGNAL = input.required<WritableSignal<boolean>>(); 

    //output
    protected onReady   = output<void>();
    protected onDestroy = output<void>(); 

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
    protected isLoading = computed<boolean>(() => this.isLoadingSIGNAL()());  

    //computed  
    protected _showFilter = computed<boolean>(() => Tools.IsNotOnlyWhiteSpace(`${this.searchSIGNAL()}`));  
}
