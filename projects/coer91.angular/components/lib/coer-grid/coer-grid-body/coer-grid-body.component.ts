import { IGridDataSource, IGridColumnIndex, IGridColumn } from '../interfaces';
import { Component, computed, input } from '@angular/core'; 


@Component({
    selector: 'coer-grid-body',
    templateUrl: './coer-grid-body.component.html', 
    styleUrl: './coer-grid-body.component.scss',
    standalone: false
})
export class CoerGridBody<T> {

    //Variables

    //Elements 
    
    //Inputs  
    public CalculateId  = input.required<(indexRow: number, indexColumn: number, suffix?: string) => string>();
    public columns      = input<IGridColumnIndex<T>[]>([]);
    public dataSource   = input<IGridDataSource[]>([]);
    public showStriped  = input<boolean>(true);
    public showBorders  = input<boolean>(true);
    public showHover    = input<boolean>(true); 
}