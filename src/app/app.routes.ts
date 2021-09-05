import { Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { LoginComponent } from "./login/login.component";

export const AppRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'main', loadChildren: () => import("./main/main.module").then(m => m.MainModule), canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login' }
]