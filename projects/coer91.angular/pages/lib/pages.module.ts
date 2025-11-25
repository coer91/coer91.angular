import { NgModule } from '@angular/core';     

//Pages  
import { HomePage } from './home/home.component'; 

export const ROUTES: any = [  
    { path: 'home', component: HomePage, data: { activeKey: '' }},
    { path: '**', redirectTo: 'home' }     
];

@NgModule({    
    imports: [  

    ],
    declarations: [ 
        HomePage,
    ],
    exports: [  
        HomePage,
    ]
})
export class PagesModule { }