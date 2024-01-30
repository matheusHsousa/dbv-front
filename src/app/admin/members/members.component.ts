import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent {
  members: any;
  inactiveMembers: any[] = [];
  isChecked: any;
  filter: FormGroup;
  inactiveFilter: FormGroup;

  constructor(
    private adminService: AdminService,    
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    ){
      this.getAll();

    this.adminService.getInactiveMembers().subscribe((data) => {
      this.inactiveMembers = data.map((member: any) => ({ ...member, isActive: false }));
    });
  
    this.filter = this.setInitialForm();
    this.inactiveFilter = this.setInitialFormInactive();

  }


  getAll(){
    this.adminService.getMembers().subscribe((data)=>{
      this.members = data;
    })
  }

  seeMore(member: any) {
    this.adminService.setMember(member);
    this.router.navigate(['admin/registration-form']);
  }

  edit(member: any) {
    this.router.navigate(['admin/edit-member', member.id]);
  }
  

  changeStatus(id: any, isChecked: boolean) {
    const data = {
      id: id,
      status: isChecked
    };
  
    this.adminService.changeStatus(data).subscribe(
      (response) => {
        this.openSnackBar('Status do membro alterado com sucesso', 'Fechar');
      },
      (error) => {
        this.openSnackBar('Erro ao alterar o status do membro', 'Fechar');
      }
    );
  }  

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }


  setInitialForm() {
    return this.formBuilder.group({
      name: [''],
    });
  }


  setInitialFormInactive() {
    return this.formBuilder.group({
      name: [''],
    });
  }

  submit() {
    const values = this.filter.value;
  
    this.adminService.filterMemberName(values).subscribe((data) => {
      this.members = data;
    });
  }  

  clean() {
    this.filter = this.setInitialForm();
    this.getAll();
  }

  submitInactve() {
    const values = this.inactiveFilter.value;
      
    this.adminService.filterMemberNameInactive(values).subscribe((data) => {
      this.inactiveMembers = data;
    });
  }  

  cleanInactve() {
    this.filter = this.setInitialForm();
    this.getAll();
  }
}
