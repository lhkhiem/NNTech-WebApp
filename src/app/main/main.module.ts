import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainRoutes } from './main.routes';
import { MainComponent } from './main.component';
import { UserComponent } from './user/user.component';

import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ProgressBarModule} from 'primeng/progressbar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    MainComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MainRoutes),
    ModalModule.forRoot(),
    MultiSelectModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    CheckboxModule,
    ConfirmDialogModule,
    ProgressBarModule
  ],
  providers: [ConfirmationService]
})
export class MainModule { }
