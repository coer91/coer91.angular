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
    }

    protected dataSource2 = []
    //Variables
    protected dataSource = [
        { id: 1.00,  name: 'Aug 08, 2024' , isBool: true, checked: true },
        { id: 2.10,  name: 'Aug 08, 2024' , isBool: false, checked: false  },
        { id: 2.00,  name: 'Aug 08, 2024' , isBool: true, checked: true  }, 
        { id: 14.0,  name: 'Aug 07, 2024' , isBool: false, checked: false },  
        { id: 5.00,  name: 'Aug 08, 2024' , isBool: false, checked: false },  
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