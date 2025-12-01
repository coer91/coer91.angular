import { IGridCoerSwitch } from "./grid-coer-switch.interface";
import { IGridItem } from "./grid-item.interface"; 

export interface IGridColumn<T> {
    property:          string;
    alias?:            string;
    short?:            boolean;
    width?:            string;
    height?:           string;
    textBreak?:        boolean;
    textAlignX?:       'left' | 'center' | 'right';
    textAlignY?:       'top'  | 'middle' | 'bottom';
    color?:            'primary' | 'secondary' | 'success' | 'warning'  | 'danger' | 'navigation' | 'information' | 'dark' | 'light' | ((item: IGridItem<T>) => 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light');
    type?:             'number' | 'currency' | 'date' | 'datetime' | 'time' | 'string' | ((item: IGridItem<T>) => 'number'  | 'currency'  | 'date' | 'datetime' | 'time' | 'string');
    template?:         null    | string  | ((item: IGridItem<T>) => string);
    coerSwitch?:       null    | boolean | ((item: IGridItem<T>) => IGridCoerSwitch);
    // coerTextbox?:   null    | boolean | ((item: IGridItem<T>) => IGridCoerTextBox);
    // coerNumberbox?: null    | boolean | ((item: IGridItem<T>) => IGridCoerNumberBox);
    // coerSelectbox?: null    | boolean | ((item: IGridItem<T>) => IGridCoerSelectBox);
    // coerDatebox?:   null    | boolean | ((item: IGridItem<T>) => IGridCoerTextBox);
} 