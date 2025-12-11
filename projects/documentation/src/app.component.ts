import { RootModule } from './core/root.module'; 
import { Component, viewChild  } from '@angular/core';  
import { NAVIGATION } from './navigation';
import { ILoginResponse, IMenu, IMenuToolbar } from 'coer91.tools/interfaces';
import { isLoadingSIGNAL } from 'coer91.angular/signals';
import { Coer91 } from 'coer91.angular/pages';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RootModule],
    templateUrl: './app.component.html'
})
export class AppComponent {  
    
    //Elements
    protected readonly _coer91 = viewChild<Coer91>('coer91');
    
    protected user: ILoginResponse | null = null;
    protected navigation: IMenu[] = []; 
    protected toolbarMenu: IMenuToolbar[] = [];    

    constructor() {         
        this.navigation = NAVIGATION; 

        this.user = {
            userId: 0, 
            user: 'COER091',
            userNumber: '',  
            role: 'Development',
            partner: 'COER 91',
            fullName: 'Christian Omar Escamilla Rodriguez',
            nickname: 'Chris',
            email: 'coer0408@gmail.com',
            jwt: '', 
            message: '',
            roles: ['Development', 'User'],
        }
    }


    /** */
    protected UpdateRole(role: string) {
        try {
            if(role.equals(this.user?.role)) return;
            isLoadingSIGNAL.set(true);
            
            
            //Implements Logic
            console.log(role)
        }

        catch(error) {
            console.log(error);
        }

        finally {
            this._coer91()?.CloseModal();
            isLoadingSIGNAL.set(false);
        }
    }


    /** */
    protected UpdatePassword(password: string) {
        try { 
            isLoadingSIGNAL.set(true);
            
            
            //Implements Logic
            console.log(password)
        }

        catch(error) {
            console.log(error);
        }

        finally {
            this._coer91()?.CloseModal();
            isLoadingSIGNAL.set(false);
        }
    }
}