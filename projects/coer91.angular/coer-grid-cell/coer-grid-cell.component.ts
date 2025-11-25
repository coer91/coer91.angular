import { Component, computed, input, output, viewChild } from '@angular/core'; 
import { IGridHeader, IGridInput, IGridKeyupEnter } from 'coersystem/interfaces';
import { colorsSIGNAL } from 'coersystem/signals';
import { Dates, Numbers, Strings, Tools } from 'coersystem/tools';
import { CoerSwitch } from '../../coer-switch/coer-switch.component';
import { CoerTextBox } from '../../coer-textbox/coer-textbox.component';
import { CoerNumberBox } from '../../coer-numberbox/coer-numberbox.component';
import { CoerSelectbox } from '../../coer-selectbox/coer-selectbox.component';
import { CoerDateBox } from '../../coer-datebox/coer-datebox.component';

@Component({
    selector: 'coer-grid-cell',
    templateUrl: './coer-grid-cell.component.html',
    standalone: false
})
export class CoerGridCell<T> {

    //Elements  
    protected readonly coerSwitch    = viewChild<CoerSwitch>('coerSwitch');
    protected readonly coerTextbox   = viewChild<CoerTextBox>('coerTextbox');
    protected readonly coerNumberbox = viewChild<CoerNumberBox>('coerNumberbox');
    protected readonly coerSelectbox = viewChild<CoerSelectbox<T>>('coerSelectbox');
    protected readonly coerDatebox   = viewChild<CoerDateBox>('coerDatebox');

    //Inputs 
    public id           = input.required<string>();
    public header       = input.required<IGridHeader<T>>();
    public row          = input.required<any>(); 
    public checkOnRow   = input.required<boolean>(); 
    public enableInputs = input.required<boolean>(); 

    //Outputs
    protected onClickRow        = output<T>();
    protected onDoubleClickRow  = output<T>(); 
    protected onSwitchChange    = output<IGridInput<T>>();
    protected onTextboxChange   = output<IGridInput<T>>();
    protected onNumberboxChange = output<IGridInput<T>>();
    protected onSelectboxChange = output<IGridInput<T>>();
    protected onKeyupEnter      = output<IGridKeyupEnter>();


    /** */
    protected _GetCellValue = computed<string>(() => {  
        let value: any = this.row()[Strings.FirstCharToLower(this.header().property)]; 

        //Template
        if(Tools.IsNotNull(this.header().config?.template)) {    
            if(Tools.IsString(this.header()?.config?.template)) {
                value = this.header()?.config?.template as string;
            }

            else if(Tools.IsFunction(this.header()?.config?.template)) {
                value = (this.header()?.config as any)?.template({
                    indexRow: this.row().indexRow,
                    property: this.header()?.config?.property,
                    row: { ...this.row() },
                    value: value
                });
            }
        }

        //Currency
        else if(Tools.IsNotNull(this.header().config?.typeCurrency)) {             
            value = Tools.IsBooleanTrue(this.header()?.config?.typeCurrency) ||
                Tools.IsFunction(this.header()?.config?.typeCurrency) && (this.header()?.config as any)?.typeCurrency({
                    indexRow: this.row().indexRow,
                    property: this.header()?.config?.property,
                    row: { ...this.row() },
                    value: value
                }) ? Numbers.GetCurrencyFormat(value) : value; 
        }

        //Number
        else if(Tools.IsNotNull(this.header().config?.typeNumber)) {             
            value = Tools.IsBooleanTrue(this.header()?.config?.typeNumber) ||
                Tools.IsFunction(this.header()?.config?.typeNumber) && (this.header()?.config as any)?.typeNumber({
                    indexRow: this.row().indexRow,
                    property: this.header()?.config?.property,
                    row: { ...this.row() },
                    value: value
                }) ? Numbers.GetNumericFormat(value) : value; 
        } 

        //Date - Time
        else if(Tools.IsNotNull(this.header().config?.typeDate) || Tools.IsNotNull(this.header().config?.typeDateTime)) {   
            value = Tools.IsNull(this.header()?.config?.toLocalZone) ||
                Tools.IsBooleanTrue(this.header()?.config?.toLocalZone) ||
                Tools.IsFunction(this.header()?.config?.toLocalZone) && (this.header()?.config as any)?.toLocalZone({
                    indexRow: this.row().indexRow,
                    property: this.header()?.config?.property,
                    row: { ...this.row() },
                    value: value
                }) ? Dates.ToLocalZone(value) : value;      
                
            if(Tools.IsNotNull(this.header().config?.typeDateTime)) {             
                value = Tools.IsBooleanTrue(this.header()?.config?.typeDateTime) ||
                    Tools.IsFunction(this.header()?.config?.typeDateTime) && (this.header()?.config as any)?.typeDateTime({
                        indexRow: this.row().indexRow,
                        property: this.header()?.config?.property,
                        row: { ...this.row() },
                        value: value
                    }) ? Dates.ToFormatDateTime(value) : value; 
            }
    
            else if(Tools.IsNotNull(this.header().config?.typeDate)) {
                value = Tools.IsBooleanTrue(this.header()?.config?.typeDate) ||
                    Tools.IsFunction(this.header()?.config?.typeDate) && (this.header()?.config as any)?.typeDate({
                        indexRow: this.row().indexRow,
                        property: this.header()?.config?.property,
                        row: { ...this.row() },
                        value: value
                    }) ? Dates.ToFormatDate(value) : value;
            }  
        }

        return Tools.IsOnlyWhiteSpace(value) ? '' : `${value}`;
    });


    /** */
    protected _GetTextAlignX = computed<'flex-start' | 'center' | 'flex-end'>(() => {
        switch(this.header()?.config?.textAlignX) {
            case 'left'  : return 'flex-start';
            case 'center': return 'center';
            case 'right' : return 'flex-end';
            default      : return 'flex-start';
        }
    });


    /** */
    protected _GetTextAlignY = computed<'flex-start' | 'center' | 'flex-end'>(() => {
        switch(this.header()?.config?.textAlignY) {
            case 'top'    : return 'flex-start';
            case 'middle' : return 'center';
            case 'bottom' : return 'flex-end';
            default       : return 'center';
        }
    });


    /** */
    protected _GetTextBreak = computed<'break-word' | 'keep-all'>(() => {
        return Tools.IsNull(this.header().config?.textBreak) || this.header().config?.textBreak === false
            ? 'keep-all' : 'break-word';
    });


    /** */
    protected _GetSpaceBreak = computed<'nowrap' | 'normal'>(() => {
        return Tools.IsNull(this.header().config?.textBreak) || this.header().config?.textBreak === false
            ? 'nowrap' : 'normal';
    });


    /** */
    protected _GetHeight = computed<string>(() => {
        return Tools.IsNull(this.header().config?.height)
            ? 'auto' : this.header().config?.height!;
    });


    /** */
    protected _GetTextColor = computed(() => { 
        switch(['textBlue', 'textGreen', 'textYellow', 'textOrange', 'textRed'].find(color => 
            Tools.IsNotNull(this.header()?.config) && (
                (Tools.IsBooleanTrue(this.header()?.config, color)) || (                
                    Tools.IsFunction(this.header()?.config, color) && (this.header()?.config as any)[color]({ 
                        indexRow: this.row().indexRow, 
                        property: this.header()?.property, 
                        row:      { ...this.row() }, 
                        value:    this.row()[this.header()?.property || ''] 
                    })
                )
            )
        )) {
            case 'textBlue'  : return colorsSIGNAL().fixedColors.blue;
            case 'textGreen' : return colorsSIGNAL().fixedColors.green;
            case 'textYellow': return colorsSIGNAL().fixedColors.yellow;
            case 'textOrange': return colorsSIGNAL().fixedColors.orange;
            case 'textRed'   : return colorsSIGNAL().fixedColors.red;
            default          : return colorsSIGNAL().fixedColors.black;
        }
    });  


    /** */
    protected _switchAttributes = () => { 
        return Tools.IsFunction(this.header()?.config?.coerSwitch) 
            ? (this.header()?.config as any)?.coerSwitch({
                indexRow: this.row().indexRow,
                property: this.header()?.property, 
                row:      { ...this.row() }, 
                value:    this.row()[this.header()?.property || ''] 
            }) : null;
    }
    

    /** */
    protected _textboxAttributes = () => { 
        return Tools.IsFunction(this.header()?.config?.coerTextbox) 
            ? (this.header()?.config as any)?.coerTextbox({
                indexRow: this.row().indexRow,
                property: this.header()?.property, 
                row:      { ...this.row() }, 
                value:    this.row()[this.header()?.property || ''] 
            }) : null;
    } 


    /** */
    protected _numberboxAttributes = () => { 
        return Tools.IsFunction(this.header()?.config?.coerNumberbox)
            ? (this.header()?.config as any)?.coerNumberbox({
                indexRow: this.row().indexRow,
                property: this.header()?.property, 
                row:      { ...this.row() }, 
                value:    this.row()[this.header()?.property || ''] 
            }) : null;
    } 


    /** */
    protected _selectboxAttributes = () => { 
        return Tools.IsFunction(this.header()?.config?.coerSelectbox) 
            ? (this.header()?.config as any)?.coerSelectbox({
                indexRow: this.row().indexRow,
                property: this.header()?.property, 
                row:      { ...this.row() }, 
                value:    this.row()[this.header()?.property || ''] 
            }) : null;
    }  


    /** */
    protected _dateboxAttributes = () => { 
        return Tools.IsFunction(this.header()?.config?.coerDatebox)
            ? (this.header()?.config as any)?.coerDatebox({
                indexRow: this.row().indexRow,
                property: this.header()?.property, 
                row:      { ...this.row() }, 
                value:    this.row()[this.header()?.property || ''] 
            }) : null;
    } 


    /** */
    public get input(): 'coer-switch' | 'coer-textbox' | 'coer-numberbox' | 'coer-selectbox' | 'coer-datebox' | '' {
        if(this.enableInputs() && Tools.IsNull(this.header().config?.template)) {
            if(this._switchAttributes()?.showInput) {
                return 'coer-switch';
            }

            else if(this._textboxAttributes()?.showInput) {
                return 'coer-textbox';
            }

            else if(this._numberboxAttributes()?.showInput) {
                return 'coer-numberbox';
            }

            else if(this._selectboxAttributes()?.showInput) {
                return 'coer-selectbox';
            }

            else if(this._dateboxAttributes()?.showInput) {
                return 'coer-datebox';
            }
        } 

        return '';
    }  


    /** */
    public get isInvalid(): boolean {
        if(this.enableInputs() && Tools.IsNull(this.header().config?.template)) {
            if(this._switchAttributes()?.showInput) {
                return this._switchAttributes()?.isInvalid || false;
            }

            else if(this._textboxAttributes()?.showInput) {
                return this._textboxAttributes()?.isInvalid || false;
            }

            else if(this._numberboxAttributes()?.showInput) {
                return this._numberboxAttributes()?.isInvalid || false;
            }

            else if(this._selectboxAttributes()?.showInput) {
                return this._selectboxAttributes()?.isInvalid || false;
            }

            else if(this._dateboxAttributes()?.showInput) {
                return this._dateboxAttributes()?.isInvalid || false;
            }
        } 

        return false;
    } 
    
    
    /** */
    public Focus(onlyFocus: boolean = false): void {
        switch(this.input) {
            case 'coer-textbox': {
                this.coerTextbox()?.Focus(onlyFocus);
                break;
            }

            case 'coer-numberbox': {
                this.coerNumberbox()?.Focus(onlyFocus);
                break;
            }

            case 'coer-selectbox': { 
                Tools.Sleep(100).then(_ => this.coerSelectbox()?.Focus(onlyFocus));
                break;
            }

            case 'coer-datebox': { 
                //Tools.Sleep(100).then(_ => this.coerDatebox());
                break;
            }
        }
    }
}