import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ChallangeRegisterComponent } from './challange-register/challange-register.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import { RegisterMemberComponent } from './register-member/register-member.component';
import { MembersComponent } from './members/members.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { UnitComponent } from './unit/unit.component';
import { ToolsComponent } from './tools/tools.component';


@NgModule({
  declarations: [
    AdminComponent,
    EditCustomerComponent,
    ChallangeRegisterComponent,
    ChallengeListComponent,
    RegisterMemberComponent,
    MembersComponent,
    RegistrationFormComponent,
    EditMemberComponent,
    UnitComponent,
    ToolsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppMaterialModule,
    MatCardModule,
    SharedModule,
    ReactiveFormsModule,
    QRCodeModule
  ]
})
export class AdminModule { }
