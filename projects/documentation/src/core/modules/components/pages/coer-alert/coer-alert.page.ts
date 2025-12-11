import { Component, inject } from '@angular/core'; 
import { CoerAlert } from 'coer91.angular/components';
import { page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-alert-page',
    templateUrl: './coer-alert.page.html', 
    standalone: false
})
export class CoerAlertPage extends page {   
    
    //Inject
    protected readonly alert = inject(CoerAlert);
    
    //Elements 

    //Variables  
     
    constructor() {
        super('coer-alert');
    }


    //Main
    override RunPage() {
         
    }   

    protected Information() {
        this.alert.Information(null,null,null,0);
    }

    protected Success() {
        this.alert.Success(null,null,null,0);
    }

    protected Warning() {
        this.alert.Warning(null,null,null,0);
    }

    protected Error() {
        this.alert.Error(null,null,null,6000);
    }


    protected Close() {
        this.alert.CloseAllAlerts();
    }

    protected ConfirmInformation() {
        this.alert.ConfirmInformation().then(response => console.log(response));
    }

    protected ConfirmSuccess() {
        this.alert.ConfirmSuccess().then(response => console.log(response));
    }

    protected ConfirmWarning() {
        this.alert.ConfirmWarning().then(response => console.log(response));
    }

    protected ConfirmError() {
        this.alert.OkError().then(response => console.log(response));
    }
}