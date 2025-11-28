import { IGridRowButton } from "./grid-row-button.interface"; 
import { IGridItem } from "./grid-item.interface";

export interface IGridRowButtonGo<T> extends IGridRowButton<T> { 
    path?: (item: IGridItem<T>) => string; 
}