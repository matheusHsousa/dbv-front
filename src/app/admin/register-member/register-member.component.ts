import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { map } from 'rxjs/operators';
import { Base64Service } from 'src/app/shared/services/base64.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-member',
  templateUrl: './register-member.component.html',
  styleUrls: ['./register-member.component.scss']
})
export class RegisterMemberComponent {
  FormMember: FormGroup = this.setInitialFormVoid();  
  hide: boolean = true;
  roles: any;
  newImage: File | null = null;
  base64: any;
  dataSelectedImage: any
  positions: any;
  units: any;

  constructor(
    private formBuilder: FormBuilder, 
    private adminService: AdminService,
    private base64String: Base64Service,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.adminService.getRoles().subscribe((data) => {
      this.roles = data;
    });

    this.adminService.getPositions().subscribe((data) => {
      this.positions = data;
    });

    this.adminService.getNameUnits().subscribe((data)=>{
      this.units = data;
    })
  }

  setInitialFormVoid(): FormGroup {
    return this.formBuilder.group({
      image: [''],
      memberName: ['', Validators.required],
      position: ['', Validators.required],
      unit: ['', Validators.required],
      birthday: ['', Validators.required],
      cellNumber1: [''],
      role: ['', Validators.required],
      status: true,
      login: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  save() {
    if (this.FormMember.valid) {
      const formData = this.FormMember.value;
      formData.birthday = this.datePipe.transform(formData.birthday, 'yyyy-MM-dd');
      formData.image = this.base64;

      this.adminService.registerMember(formData).subscribe(
        (response) => {
          this.openSnackBar('Membro registrado com sucesso', 'Fechar');
          this.FormMember = this.setInitialFormVoid();
          this.router.navigate(['/admin'])
        },
        (error) => {
          this.openSnackBar(
            'Erro ao registrar novo membro',
            'Fechar'
          );
        }
      );
    } else {
      console.log('Formulário inválido. Corrija os erros antes de enviar.');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  onFileSelected(event: any) {
    this.newImage = event.target.files[0];

    if (this.newImage) {
      this.base64String.fileToBase64(this.newImage).then((base64String) => {
        this.base64 = base64String;
        this.dataSelectedImage = base64String;
      });
    }
  }


  formatPhoneNumber() {
    const cellNumberControls = ['cellNumber1', 'cellNumber2', 'cellNumber3'];
  
    for (const controlName of cellNumberControls) {
      const celNumberControl = this.FormMember.get(controlName);
      
      if (celNumberControl) {
        let phoneNumber = celNumberControl.value.toString().replace(/\D/g, '');
        
        if (phoneNumber.length === 11) {
          phoneNumber = `(${phoneNumber.substring(0, 2)}) ${phoneNumber.substring(2, 7)}-${phoneNumber.substring(7)}`;
          celNumberControl.setValue(phoneNumber, { emitEvent: false });
        }
      }
    }
  }
  
  
  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }


  clean() {
    this.FormMember = this.setInitialFormVoid();
  }
}
