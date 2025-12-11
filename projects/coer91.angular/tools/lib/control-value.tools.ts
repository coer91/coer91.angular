import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { forwardRef } from "@angular/core"; 
import { Tools } from "coer91.tools";

export const CONTROL_VALUE = <T>(component: T) => {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => component),
        multi: true
    }
} 

export abstract class ControlValue {

    //Variables
    protected _isTouched: boolean = false;
    protected _IsTouched!: Function;
    protected _UpdateValue!: Function;

    protected IsNull              = Tools.IsNull;
    protected IsNotNull           = Tools.IsNotNull;
    protected IsOnlyWhiteSpace    = Tools.IsOnlyWhiteSpace;
    protected IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace; 
    protected IsBooleanTrue       = Tools.IsBooleanTrue;
    protected IsBooleanFalse       = Tools.IsBooleanFalse;
    
    /** Current value of the component */
    protected _value!: any; 


    /** Property to validate if the component has been touched */
    public get isTouched(): boolean {
        return this._isTouched;
    } 


    /** Sets the value of the component */
    protected setValue(value: any): void {
        if(typeof this._UpdateValue === 'function') {
            this._UpdateValue(value); 
        } 
         
        this._value = value;
    }


    /** Sets the value of the component when it is created */
    protected writeValue(value: any): void {  
        this.setValue(value);
        
    }


    /** Sets the value of the component when it is updated */
    protected registerOnChange(callback: Function): void { 
        if(typeof callback === 'function') {
            this._UpdateValue = callback;  
        }  
    }


    /** Sets the component's touched status when it is updated */
    protected registerOnTouched(callback: Function): void {
        this._IsTouched = callback;
    } 


    /** Sets whether the component has been touched */
    public SetTouched(isTouched: boolean): void {
        if(typeof this._IsTouched === 'function') {
            this._IsTouched(isTouched);
        }

        this._isTouched = isTouched;
    } 
}