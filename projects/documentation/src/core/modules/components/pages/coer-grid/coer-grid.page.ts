import { Component } from '@angular/core'; 
import { page } from '@library/tools';

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
        { id: 1, name: 'One' },
        { id: 2, name: 'Two' },
        { id: 3, name: 'Three' }, 
        { id: 4, name: 'Four' }, 
         { id: 1, name: 'One' },
        { id: 2, name: 'Two' },
        { id: 3, name: 'Three' }, 
        { id: 4, name: 'Four' }, 
        { id: 1, name: 'One' },
        { id: 2, name: 'Two' },
        { id: 3, name: 'Three' }, 
        { id: 4, name: 'Four' }, 
        { id: 1, name: 'One' },
        { id: 2, name: 'Two' },
        { id: 3, name: 'Three' }, 
        { id: 4, name: 'Four' }, 
        { id: 1, name: 'One' },
        { id: 2, name: 'Two' },
        { id: 3, name: 'Three' }, 
        { id: 4, name: 'Four' }, 
        { id: 1, name: 'One' },
        { id: 2, name: 'Two' },
        { id: 3, name: 'Three' }, 
        { id: 4, name: 'Four' }, 
        { id: 1, name: 'One' },
        { id: 2, name: 'Two' },
        { id: 3, name: 'Three' }, 
        { id: 4, name: 'Four' }, 
        { id: 1, name: 'One' },
        { id: 2, name: 'Two' },
        { id: 3, name: 'Three' }, 
        { id: 4, name: 'Four' }, 
        { id: 1, name: 'One' },
        { id: 2, name: 'Two' },
        { id: 3, name: 'Three' }, 
        { id: 4, name: 'Four' }, 

        { id: 1, name: 'One' },
        { id: 2, name: 'Two' },
        { id: 3, name: 'Three' }, 
        { id: 4, name: 'Four' }, 
        { id: 1, name: 'One' },
        { id: 2, name: 'Two' },
        { id: 3, name: 'Three' }, 
        { id: 4, name: 'Four' }, 
        { id: 1, name: 'One' },
        { id: 2, name: 'Two' },
        { id: 3, name: 'Three' }, 
        { id: 4, name: 'Four' }, 
        { id: 1, name: 'One' },
        { id: 2, name: 'Two' },
        { id: 3, name: 'Three' }, 
        { id: 4, name: 'Four' }, 
        { id: 1, name: 'One' },
        { id: 2, name: 'Two' },
        { id: 3, name: 'Three' }, 
        { id: 4, name: 'Four' }, 
    ]; 

    Log(event: string, value: any){ 
        console.log({ event, value })
    }


    protected path = (xxx: any) => `${xxx.row.id}`
}