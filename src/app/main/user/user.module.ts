import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { ModalModule } from 'ngx-bootstrap/modal';

const userRouter: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: UserComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    RouterModule.forChild(userRouter)
  ]
})
export class UserModule { }
