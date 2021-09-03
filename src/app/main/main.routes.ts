import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MainComponent } from "./main.component";

export const MainRoutes: Routes = [
    {
        path: '', component: MainComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: '**', redirectTo: 'home' }
            // { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
            // { path: 'role', loadChildren: () => import('./role/role.module').then(m => m.RoleModule) }
        ]
    }
]