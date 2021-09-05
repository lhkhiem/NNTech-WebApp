import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SystemConstants } from "../common/system.constants";
import { UrlConstants } from "../common/url.constants";
@Injectable()
export class AuthGuard implements CanActivate  {
    constructor(private router: Router) {
    }
    canActivate(activateRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
        if (localStorage.getItem(SystemConstants.CURRENT_USER)) {
            return true;
        }
        else {
            this.router.navigate([UrlConstants.LOGIN], {
                queryParams: {
                    returnUrl: routerState.url

                }

            });
            return false;
        }
    }
}