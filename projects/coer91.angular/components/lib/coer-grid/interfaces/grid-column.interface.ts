import { IGridCoerSwitch } from "./grid-coer-switch.interface";
import { IGridItem } from "./grid-item.interface"; 

export interface IGridColumn<T> {
    property:          string;
    alias?:            string;
    width?:            string;
    height?:           string;
    textBreak?:        boolean;
    textAlignX?:       'left' | 'center' | 'right';
    textAlignY?:       'top'  | 'middle' | 'bottom';
    // textBlue?:      boolean | ((item: IGridItem<T>) => boolean);
    // textGreen?:     boolean | ((item: IGridItem<T>) => boolean);
    // textOrange?:    boolean | ((item: IGridItem<T>) => boolean);
    // textYellow?:    boolean | ((item: IGridItem<T>) => boolean);
    // textRed?:       boolean | ((item: IGridItem<T>) => boolean);
    // typeNumber?:    boolean | ((item: IGridItem<T>) => boolean);
    // typeCurrency?:  boolean | ((item: IGridItem<T>) => boolean);
    // typeDate?:      boolean | ((item: IGridItem<T>) => boolean);
    // typeDateTime?:  boolean | ((item: IGridItem<T>) => boolean);
    // toLocalZone?:   boolean | ((item: IGridItem<T>) => boolean);
    template?:         null    | ((item: IGridItem<T>) => string) | string;
    coerSwitch?:       null    | ((item: IGridItem<T>) => IGridCoerSwitch);
    // coerTextbox?:   null    | ((item: IGridItem<T>) => IGridCoerTextBox);
    // coerNumberbox?: null    | ((item: IGridItem<T>) => IGridCoerNumberBox);
    // coerSelectbox?: null    | ((item: IGridItem<T>) => IGridCoerSelectBox);
    // coerDatebox?:   null    | ((item: IGridItem<T>) => IGridCoerTextBox);
} 