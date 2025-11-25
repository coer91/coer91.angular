import { RootModule } from './core/root.module'; 
import { Component  } from '@angular/core';  
import { NAVIGATION } from './navigation';
import { IMenuToolbar } from 'coer91.tools/interfaces';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RootModule],
    templateUrl: './app.component.html'
})
export class AppComponent {  
      
    
    protected _toolbarMenu: IMenuToolbar[] = [];
    
    protected _navigation: any[] = []; 


    constructor() {
         
            this._navigation = NAVIGATION 
    }

    Log(e: any) {
        console.log(e)
    }
}