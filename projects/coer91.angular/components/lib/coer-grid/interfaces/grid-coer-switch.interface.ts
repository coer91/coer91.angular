export interface IGridCoerSwitch {
    showInput  : boolean;
    isReadonly?: boolean;
    type?      : 'switch' | 'checkbox';
    tooltip?   : string;
    tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';
    color?     : 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information';
}