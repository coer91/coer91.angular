import { AfterViewInit, Component, inject, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PageControl, Tools } from "coer91.tools";

@Component({ template: '' })
export class page extends PageControl implements AfterViewInit {

    //Injection
    //protected readonly alert  = inject(CoerAlert);
    protected readonly router = inject(Router);
    private readonly __activatedRoute = inject(ActivatedRoute);

    /** */
    protected routeParams: any;

    /** */
    protected queryParams: any;


    constructor(@Inject(String) pageName: string) {
        super(pageName); 
    }
    

    async ngAfterViewInit() {
        this.routeParams = this.__activatedRoute.snapshot.params;
        this.queryParams = this.__activatedRoute.snapshot.queryParams;

        await Tools.Sleep();
        this.isReadyPage = true;
        this.RunPage(); 
         
    }


    /** Main method. Starts after ngAfterViewInit() */
    protected RunPage(): void {};


    /** Navigate to previous page */
    protected override GoToSource<T>(pageResponse: T | null = null): void {
        super.GoToSource(this.router.navigateByUrl, pageResponse);
    };
}