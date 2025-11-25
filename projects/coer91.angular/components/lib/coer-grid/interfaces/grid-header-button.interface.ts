export interface IGridHeaderButton {
    show: boolean;
    path?: string;
    tooltip?: string;
    isDisabled?: boolean;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light'; 
}