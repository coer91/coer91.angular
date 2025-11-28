import { Component, AfterViewInit, OnDestroy } from '@angular/core'; 

@Component({
    selector: 'coer-grid-page',
    templateUrl: './coer-grid.page.html', 
    standalone: false
})
export class CoerGridPage implements AfterViewInit, OnDestroy {       
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

    //output
    

    //input
     

    //AfterViewInit
    async ngAfterViewInit() {
       
    }


    //OnDestroy
    ngOnDestroy() {
         
    }  

    Log(event: string, value: any){ 
        console.log({ event, value })
    }


    protected path = (xxx: any) => `${xxx.row.id}`
}