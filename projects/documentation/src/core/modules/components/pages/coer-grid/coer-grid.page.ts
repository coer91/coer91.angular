import { Component } from '@angular/core'; 
import { page } from '@library/tools';
import { IGridCoerSwitch } from 'projects/coer91.angular/components/lib/coer-grid/interfaces';

@Component({
    selector: 'coer-grid-page',
    templateUrl: './coer-grid.page.html', 
    standalone: false
})
export class CoerGridPage extends page {     
    
    constructor() {
        super('coer-grid');
        console.log(typeof new Date)
    }

    protected dataSource2 = []
    //Variables
    protected dataSource = [
        { id: `$1.00`,  name: new Date('2024-08-08 01:00:00')  , isBool: true, checked: true },
        { id: `$2.10`,  name: new Date('2024-07-08 01:00:00')  , isBool: false, checked: false  },
        { id: `$2.00`,  name: new Date('2024-08-08 00:05:00'), isBool: true, checked: true  }, 
        { id: `$14.00`, name: new Date('2024-08-08 00:40:00') , isBool: false, checked: false },  
        { id: `$5.00`,  name: new Date('2024-08-08 00:00:00') , isBool: false, checked: false },  
    ]; 

    Log(event: string, value: any){ 
        //console.log({ event, value })
    }


    protected path = (xxx: any) => `${xxx.row.id}`

    coerSwitch = (element: any): IGridCoerSwitch => {
        return {
            showInput: true 
        }

    }
}