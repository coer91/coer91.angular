import { Route } from "@angular/router";
import { Type } from "@angular/core";

export const CHILDREN_PAGE = (path: string, component: Type<any> | undefined, activeKey: string = ''): Route => {
    return { 
        path, 
        component, 
        data: { activeKey }
    };
}