import { IGridColumn } from "./grid-column.interface";

export interface IGridColumnIndex<T> {
    indexColumn: number;
    columnName: string; 
    config: IGridColumn<T>; 
}