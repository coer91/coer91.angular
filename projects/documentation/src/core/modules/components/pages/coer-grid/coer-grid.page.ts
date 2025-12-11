import { Component } from '@angular/core'; 
import { page } from 'coer91.angular/tools';
import { Tools } from 'coer91.tools';
import { IGridSelectBox, IGridSwitch, IGridTextBox } from 'projects/coer91.angular/components/lib/coer-grid/interfaces';

@Component({
    selector: 'coer-grid-page',
    templateUrl: './coer-grid.page.html', 
    standalone: false
})
export class CoerGridPage extends page {     
    
    constructor() {
        super('coer-grid');
    }

    protected dataSource2 = [{name: 'one'},{name: 'two'},{name: 'three'}]

    //Variables
    protected dataSource = [
        { id: 1.00,  name: 'one' , isBool: true, checked: true },
        { id: 2.10,  name: 'one' , isBool: false, checked: false  },
        { id: 2.00,  name: 'one' , isBool: true, checked: true  }, 
        { id: 14.0,  name: '' , isBool: false, checked: false },   

    ]; 

    Log(event: string, value: any){ 
        //console.log({ event, value })
    }


    protected path = (xxx: any) => `${xxx.row.id}`

    coerSwitch = (element: any): IGridSwitch => {
        return {
            showInput: true 
        }

    }


    coerSelectbox = (element: any): IGridSelectBox => { 
        return {
            showInput: true,
            isValid: true,
            isInvalid: Tools.IsOnlyWhiteSpace(element.value),
            dataSource: this.dataSource2 
        }
    }
}