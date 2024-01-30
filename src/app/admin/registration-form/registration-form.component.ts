import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  member: any;
  isChecked: any;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    ) {
    this.member = this.adminService.getMember();

    this.adminService.getStatusMember(this.member.id).subscribe((data)=>{
      this.isChecked = data
    })
  }
   
  changeStatus() {
    const data = {
      id: this.member.id,
      status: this.isChecked
    };
  
    this.adminService.changeStatus(data).subscribe(
      (response) => {
        this.openSnackBar('Status do membro alterado com sucesso', 'Fechar');
      },
      (error) => {
        this.openSnackBar(
          'Erro ao alterar o status do membro',
          'Fechar'
        );
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
}
