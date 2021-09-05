import { Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { HomeComponent } from "./home/home.component";
import { MainComponent } from "./main.component";

export const MainRoutes: Routes = [
    {
        path: '', component: MainComponent
        , children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
            //{ path: '**',component:ErrorComponent }
            // { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
            // { path: 'role', loadChildren: () => import('./role/role.module').then(m => m.RoleModule) }
        ]
    }
]