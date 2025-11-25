import { Component, AfterViewInit, OnDestroy } from '@angular/core'; 

@Component({
    selector: 'coer-grid-page',
    templateUrl: './coer-grid.page.html', 
    standalone: false
})
export class CoerGridPage implements AfterViewInit, OnDestroy {       

    //Variables
    protected dataSource = [
        { id: 122222222, name: 'Christ', name2: 'eeeeeeeeeee  eeeeeeeeeeeee e' },
        { id: 1, name: 'Christ' },
        { id: 2, name: 'Chritst' }, 
        { id: 1, name: 'Christ' }, 
    ];

    //output
    

    //input
     

    //AfterViewInit
    async ngAfterViewInit() {
       
    }


    //OnDestroy
    ngOnDestroy() {
         
    }   
}