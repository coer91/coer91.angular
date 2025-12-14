import { AfterViewInit, Component } from '@angular/core';  
import { HTMLElements, Tools } from 'coer91.tools';

@Component({
    selector: 'coer-alert',
    templateUrl: './coer-alert.component.html',
    styleUrls: ['./coer-alert.component.scss'],
    standalone: true
})
export class CoerAlert implements AfterViewInit { 

    protected static _alert: HTMLElement; 
    protected static _confirm:   HTMLElement; 

    async ngAfterViewInit() {
        while(Tools.IsNull(CoerAlert._alert) || Tools.IsNull(CoerAlert._confirm)) {
            CoerAlert._alert = document.querySelector('#coerAlert')!;
            CoerAlert._confirm   = document.querySelector('#coerConfirm')!;
            await Tools.Sleep(100);
        } 
    }

    /** Use this alert to broadcast an informational message */
    public async Information(message: string | null = null, title: string | null = null, icon: string | null = null, autohide: number | null = 3000): Promise<HTMLElement> {
        while(Tools.IsNull(CoerAlert._alert)) await Tools.Sleep(100);
        
        message  = Tools.IsNotOnlyWhiteSpace(message) ? message  : '';
        title    = Tools.IsNotOnlyWhiteSpace(title)   ? title    : 'Information';
        icon     = Tools.IsNotOnlyWhiteSpace(icon)    ? icon     : 'i91-info-circle';
        autohide = Tools.IsNotNull(icon)              ? autohide : 0;

        return await this._BuildAlert(message!, title!, icon!, autohide!, 'background-color-information');  
    }


    /** Use this alert to issue a success message */
    public async Success(message: string | null = null, title: string | null = null, icon: string | null = null, autohide: number | null = 3000): Promise<HTMLElement> {
        while(Tools.IsNull(CoerAlert._alert)) await Tools.Sleep(100);
        
        message  = Tools.IsNotOnlyWhiteSpace(message) ? message  : '';
        title    = Tools.IsNotOnlyWhiteSpace(title)   ? title    : 'Success';
        icon     = Tools.IsNotOnlyWhiteSpace(icon)    ? icon     : 'i91-check-circle';
        autohide = Tools.IsNotNull(icon)              ? autohide : 0;

        return await this._BuildAlert(message!, title!, icon!, autohide!, 'background-color-success');  
    }


    /** Use this alert to issue a warning message */
    public async Warning(message: string | null = null, title: string | null = null, icon: string | null = null, autohide: number | null = 3000): Promise<HTMLElement> {
        while(Tools.IsNull(CoerAlert._alert)) await Tools.Sleep(100);
        
        message  = Tools.IsNotOnlyWhiteSpace(message) ? message  : '';
        title    = Tools.IsNotOnlyWhiteSpace(title)   ? title    : 'Warning';
        icon     = Tools.IsNotOnlyWhiteSpace(icon)    ? icon     : 'i91-exclamation-triangle';
        autohide = Tools.IsNotNull(icon)              ? autohide : 0;

        return await this._BuildAlert(message!, title!, icon!, autohide!, 'background-color-warning');  
    }


    /** Use this alert to issue a error or danger */
    public async Error(message: string | null = null, title: string | null = null, icon: string | null = null, autohide: number | null = 3000): Promise<HTMLElement> {
        while(Tools.IsNull(CoerAlert._alert)) await Tools.Sleep(100);
        
        message  = Tools.IsNotOnlyWhiteSpace(message) ? message  : '';
        title    = Tools.IsNotOnlyWhiteSpace(title)   ? title    : 'Error';
        icon     = Tools.IsNotOnlyWhiteSpace(icon)    ? icon     : 'i91-bug-fill';
        autohide = Tools.IsNotNull(icon)              ? autohide : 0;

        return await this._BuildAlert(message!, title!, icon!, autohide!, 'background-color-danger');  
    }


    /** */
    public CloseAlert(alert: HTMLElement): void {
        if (CoerAlert._alert.contains(alert)) { 
            HTMLElements.RemoveClass(alert, 'background-color-information');
            HTMLElements.RemoveClass(alert, 'background-color-success');
            HTMLElements.RemoveClass(alert, 'background-color-warning');
            HTMLElements.RemoveClass(alert, 'background-color-danger');
            alert.removeEventListener('mouseenter', (alert as any).StopAutohide);
            alert.removeEventListener('mouseleave', (alert as any).StartAutohide); 
            Tools.Sleep(500).then(() =>  CoerAlert._alert.removeChild(alert!)); 
        } 
    } 


    /** */
    public CloseAllAlerts(): void {
        HTMLElements.SelectAllElements('aside#coerAlert > div.coer-alert').forEach(alert => this.CloseAlert(alert)); 
    } 


    /** */
    private async _BuildAlert(message: string, title: string, icon: string, autohide: number, backround: string): Promise<HTMLElement> {   
        const id = Tools.GetGuid('coer-alert');

        const COER_ALERT = document.createElement('div') as any;
        COER_ALERT.className = 'coer-alert alert-hidden';  
        COER_ALERT.setAttribute('id', id);
    
        const HEADER = document.createElement('div');
        HEADER.className = 'coer-alert-header'
    
        const HEADER_TITLE = document.createElement('div');
        HEADER_TITLE.className = 'coer-alert-header-title';
            
        const ICON = document.createElement('i');
        ICON.className = icon;
        HEADER_TITLE.appendChild(ICON);
    
        const TITLE = document.createElement('b');
        TITLE.textContent = title;
        HEADER_TITLE.appendChild(TITLE);
    
        const BUTTON = document.createElement('button');
        BUTTON.type = 'button';
        BUTTON.className = 'i91-x';
        BUTTON.onclick = () => this.CloseAlert(COER_ALERT);
    
        HEADER.appendChild(HEADER_TITLE);
        HEADER.appendChild(BUTTON);
        
        const BODY = document.createElement('div');
        BODY.className = 'coer-alert-body';
    
        const PRE = document.createElement('pre');
        PRE.innerHTML = message;
    
        BODY.appendChild(PRE);
        COER_ALERT.appendChild(HEADER);
        COER_ALERT.appendChild(BODY); 

        CoerAlert._alert.appendChild(COER_ALERT); 
        
        await Tools.Sleep(); 
        HTMLElements.ScrollToElement(COER_ALERT);
        HTMLElements.RemoveClass(COER_ALERT, 'alert-hidden');
        HTMLElements.AddClass(COER_ALERT, backround);  

        //Autohide
        let autohideRef$: any;
        COER_ALERT.StartAutohide = () => {
            if (autohide > 0) {
                autohide = autohide >= 1000 ? autohide : 1000;
                autohideRef$ = setTimeout(() => this.CloseAlert(COER_ALERT), autohide);
            }
        };

        COER_ALERT.StopAutohide = () => clearTimeout(autohideRef$); 
        
        //Events
        COER_ALERT.addEventListener('mouseenter', COER_ALERT.StopAutohide);
        COER_ALERT.addEventListener('mouseleave', COER_ALERT.StartAutohide);    
        COER_ALERT.StartAutohide();
        return COER_ALERT;
    }   


    /** */
    public async InformationOk(message: string | null = null, icon: string | null = null): Promise<boolean> {
        return await this._ConfirmInformation(message, icon, true);
    }


    /** */
    public async SuccessOk(message: string | null = null, icon: string | null = null): Promise<boolean> {
        return await this._ConfirmSuccess(message, icon, true); 
    }


    /** */
    public async WarningOk(message: string | null = null, icon: string | null = null): Promise<boolean> {
        return await this._ConfirmWarning(message, icon, true);
    }


    /** */
    public async ErrorOk(message: string | null = null, icon: string | null = null): Promise<boolean> {
        return await this._ConfirmError(message, icon, true);  
    }


    /** */
    public async InformationConfirm(message: string | null = null, icon: string | null = null): Promise<boolean> {
        return await this._ConfirmInformation(message, icon, false);
    }


    /** */
    public async SuccessConfirm(message: string | null = null, icon: string | null = null): Promise<boolean> {
        return await this._ConfirmSuccess(message, icon, false); 
    }


    /** */
    public async WarningConfirm(message: string | null = null, icon: string | null = null): Promise<boolean> {
       return await this._ConfirmWarning(message, icon, false); 
    }


    /** */
    public async ErrorConfirm(message: string | null = null, icon: string | null = null): Promise<boolean> { 
        return await this._ConfirmError(message, icon, false);  
    }


    /** */
    private async _ConfirmInformation(message: string | null = null, icon: string | null = null, onlyInformation: boolean = false): Promise<boolean> {
        while(Tools.IsNull(CoerAlert._confirm)) await Tools.Sleep(100); 
        message = Tools.IsNotOnlyWhiteSpace(message) ? message : 'Confirm action';        
        icon    = Tools.IsNotOnlyWhiteSpace(icon)    ? icon    : 'i91-info-circle'; 
        return await this._BuildConfirm(message!, icon!, onlyInformation, 'information');  
    }


    /** */
    private async _ConfirmSuccess(message: string | null = null, icon: string | null = null, onlyInformation: boolean = false): Promise<boolean> {
        while(Tools.IsNull(CoerAlert._confirm)) await Tools.Sleep(100);        
        message = Tools.IsNotOnlyWhiteSpace(message) ? message : 'Confirm action';
        icon    = Tools.IsNotOnlyWhiteSpace(icon)    ? icon    : 'i91-check-circle';
        return await this._BuildConfirm(message!, icon!, onlyInformation, 'success');  
    }


    /** */
    private async _ConfirmWarning(message: string | null = null, icon: string | null = null, onlyInformation: boolean = false): Promise<boolean> {
        while(Tools.IsNull(CoerAlert._confirm)) await Tools.Sleep(100);        
        message = Tools.IsNotOnlyWhiteSpace(message) ? message : 'Confirm action';
        icon    = Tools.IsNotOnlyWhiteSpace(icon)    ? icon    : 'i91-exclamation-triangle';
        return await this._BuildConfirm(message!, icon!, onlyInformation, 'warning');  
    }


    /** */
    private async _ConfirmError(message: string | null = null, icon: string | null = null, onlyInformation: boolean = false): Promise<boolean> {
        while(Tools.IsNull(CoerAlert._confirm)) await Tools.Sleep(100);        
        message = Tools.IsNotOnlyWhiteSpace(message) ? message : 'Confirm action';
        icon    = Tools.IsNotOnlyWhiteSpace(icon)    ? icon    : 'i91-exclamation-octagon';
        return await this._BuildConfirm(message!, icon!, onlyInformation, 'danger');  
    }
 

    /** */
    private async _BuildConfirm(message: string, icon: string, onlyInformation: boolean, backround: string) {  
        CoerAlert._confirm.style.backgroundColor = 'var(--backdrop)';
        CoerAlert._confirm.style.zIndex = '2999';

        const id = Tools.GetGuid('coer-alert');
        const COER_CONFIRM = document.createElement('div') as any;
        COER_CONFIRM.className = `coer-confirm ${backround}`;  
        COER_CONFIRM.setAttribute('id', id);

        //Header
        const HEADER = document.createElement('header'); 
        
        const ICON = document.createElement('i');
        ICON.className = icon;
        
        HEADER.appendChild(ICON);
        COER_CONFIRM.appendChild(HEADER);

        //Section
        const SECTION = document.createElement('section');
        SECTION.innerHTML = message!;
        COER_CONFIRM.appendChild(SECTION);

        //Footer
        let response: boolean | null = null; 
        const FOOTER = document.createElement('footer'); 

        if(onlyInformation) {
            const BUTTON_OK = document.createElement('button');
            BUTTON_OK.type = 'button'; 
            BUTTON_OK.innerText = 'OK';
            BUTTON_OK.onclick = () => (response = true);
            
            FOOTER.appendChild(BUTTON_OK);
        }

        else {
            const BUTTON_CONFIRM = document.createElement('button');
            BUTTON_CONFIRM.type = 'button'; 
            BUTTON_CONFIRM.innerText = 'YES';
            BUTTON_CONFIRM.onclick = () => (response = true);
            
            const BUTTON_REJECT = document.createElement('button');
            BUTTON_REJECT.type = 'button'; 
            BUTTON_REJECT.innerText = 'NO';
            BUTTON_REJECT.onclick = () => (response = false);
            
            FOOTER.appendChild(BUTTON_CONFIRM);
            FOOTER.appendChild(BUTTON_REJECT);
        }

        COER_CONFIRM.appendChild(FOOTER);  

        //Build
        CoerAlert._confirm.appendChild(COER_CONFIRM);

        await Tools.Sleep();
        COER_CONFIRM.style.transform = 'scale(1)';
         
        //Wait
        while(response === null) await Tools.Sleep(500); 
        COER_CONFIRM.style.transform = 'scale(0)';  

        Tools.Sleep(400).then(() => {
            CoerAlert._confirm.style.backgroundColor = 'transparent';
            CoerAlert._confirm.style.zIndex = '1';
            CoerAlert._confirm.removeChild(COER_CONFIRM);
        });

        return response; 
    }
}