export interface IGridHeaderButton {
    show: boolean;
    path?: string;
    tooltip?: string;
    isReadonly?: boolean;
    isLoading?: boolean;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light'; 
}