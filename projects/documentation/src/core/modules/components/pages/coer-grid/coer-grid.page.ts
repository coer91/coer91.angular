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
        { id: 122222222, name: 'Christ', name2: 'eeeeeeeeeee  eeeeeeeeeeeee e' },
        { id: 1, name: 'Christ' },
        { id: 2, name: 'Chritst' }, 
        { id: 1, name: 'Christ' }, 
        { id: 122222222, name: 'Christ', name2: 'eeeeeeeeeee  eeeeeeeeeeeee e' },
        { id: 1, name: 'Christ' },
        { id: 2, name: 'Chritst' }, 
        { id: 1, name: 'Christ' }, 
        { id: 122222222, name: 'Christ', name2: 'eeeeeeeeeee  eeeeeeeeeeeee e' },
        { id: 1, name: 'Christ' },
        { id: 2, name: 'Chritst' }, 
        { id: 1, name: 'Christ' }, 
        { id: 122222222, name: 'Christ', name2: 'eeeeeeeeeee  eeeeeeeeeeeee e' },
        { id: 1, name: 'Christ' },
        { id: 2, name: 'Chritst' }, 
        { id: 1, name: 'Christ' }, 
        { id: 122222222, name: 'Christ', name2: 'eeeeeeeeeee  eeeeeeeeeeeee e' },
        { id: 1, name: 'Christ' },
        { id: 2, name: 'Chritst' }, 
        { id: 1, name: 'Christ' }, 
        { id: 122222222, name: 'Christ', name2: 'eeeeeeeeeee  eeeeeeeeeeeee e' },
        { id: 1, name: 'Christ' },
        { id: 2, name: 'Chritst' }, 
        { id: 1, name: 'Christ' }, 
        { id: 122222222, name: 'Christ', name2: 'eeeeeeeeeee  eeeeeeeeeeeee e' },
        { id: 1, name: 'Christ' },
        { id: 2, name: 'Chritst' }, 
        { id: 1, name: 'Christ' }, 
        { id: 122222222, name: 'Christ', name2: 'eeeeeeeeeee  eeeeeeeeeeeee e' },
        { id: 1, name: 'Christ' },
        { id: 2, name: 'Chritst' }, 
        { id: 1, name: 'Christ' }, 

        { id: 122222222, name: 'Christ', name2: 'eeeeeeeeeee  eeeeeeeeeeeee e' },
        { id: 1, name: 'Christ' },
        { id: 2, name: 'Chritst' }, 
        { id: 1, name: 'Christ' }, 
        { id: 122222222, name: 'Christ', name2: 'eeeeeeeeeee  eeeeeeeeeeeee e' },
        { id: 1, name: 'Christ' },
        { id: 2, name: 'Chritst' }, 
        { id: 1, name: 'Christ' }, 
        { id: 122222222, name: 'Christ', name2: 'eeeeeeeeeee  eeeeeeeeeeeee e' },
        { id: 1, name: 'Christ' },
        { id: 2, name: 'Chritst' }, 
        { id: 555567, name: 'Christ' }, 
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
}