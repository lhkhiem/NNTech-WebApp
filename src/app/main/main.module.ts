import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainRoutes } from './main.routes';
import { MainComponent } from './main.component';
import { UserComponent } from './user/user.component';



@NgModule({
  declarations: [
    MainComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MainRoutes),
  ]
})
export class MainModule { }
