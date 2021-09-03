import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
export const AppRoutes: Routes = [
    {path:'', component:LoginComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    { path: 'main', loadChildren: () => import("./main/main.module").then(m => m.MainModule) }
]