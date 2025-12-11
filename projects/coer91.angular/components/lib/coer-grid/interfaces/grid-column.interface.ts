import { IGridNumberBox } from "./grid-coer-numberbox.interface";
import { IGridSelectBox } from "./grid-coer-selectbox.interface";
import { IGridSwitch } from "./grid-coer-switch.interface";
import { IGridTextBox } from "./grid-coer-textbox.interface";
import { IGridItem } from "./grid-item.interface"; 

export interface IGridColumn<T> {
    property:       string;
    alias?:         string;
    short?:         boolean;
    width?:         string;
    height?:        string;
    textBreak?:     boolean;
    textAlignX?:    'left' | 'center' | 'right';
    textAlignY?:    'top'  | 'middle' | 'bottom';
    color?:         'primary' | 'secondary' | 'success' | 'warning'  | 'danger' | 'navigation' | 'information' | 'dark' | 'light' | ((item: IGridItem<T>) => 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light');
    type?:          'number' | 'currency' | 'date' | 'datetime' | 'time' | 'string';
    template?:      null    | string  | ((item: IGridItem<T>) => string);
    coerSwitch?:    null    | boolean | ((item: IGridItem<T>) => IGridSwitch);
    coerTextbox?:   null    | boolean | ((item: IGridItem<T>) => IGridTextBox);
    coerNumberbox?: null    | boolean | ((item: IGridItem<T>) => IGridNumberBox);
    coerSelectbox?: null    | boolean | ((item: IGridItem<T>) => IGridSelectBox);
    // coerDatebox?:   null    | boolean | ((item: IGridItem<T>) => IGridCoerTextBox);
} 