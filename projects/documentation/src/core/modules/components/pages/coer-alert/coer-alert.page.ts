import { Component, inject } from '@angular/core'; 
import { CoerAlert } from 'coer91.angular/tools';
import { page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-alert-page',
    templateUrl: './coer-alert.page.html', 
    standalone: false
})
export class CoerAlertPage extends page {    
    
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
        this.alert.InformationConfirm().then(response => console.log(response));
    }

    protected ConfirmSuccess() {
        this.alert.SuccessConfirm().then(response => console.log(response));
    }

    protected ConfirmWarning() {
        this.alert.WarningConfirm().then(response => console.log(response));
    }

    protected ConfirmError() {
        this.alert.ErrorOk().then(response => console.log(response));
    }
}