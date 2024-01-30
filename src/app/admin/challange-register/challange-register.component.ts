import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../services/admin.service';
import { DatePipe } from '@angular/common';
import { Base64Service } from 'src/app/shared/services/base64.service';



@Component({
  selector: 'app-challange-register',
  templateUrl: './challange-register.component.html',
  styleUrls: ['./challange-register.component.scss'],
  providers: [DatePipe]
})
export class ChallangeRegisterComponent {
  FormChallenge: FormGroup;
  newImage: File | null = null;
  base64: any;
  dataSelectedImage: any

  constructor(
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private datePipe: DatePipe,
    private base64String: Base64Service,
    ){
    this.FormChallenge = this.setInitialForm();
  }

  setInitialForm() { 
    return this.formBuilder.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      description_ch: ['', Validators.required],
      points: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      deadLine: ['', Validators.required]
  })}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  save() {
    if (this.FormChallenge.valid) {
      const formData = this.FormChallenge.value;
      formData.deadLine = this.datePipe.transform(formData.deadLine, 'yyyy-MM-dd');
      formData.image = this.base64;

      this.adminService.creatChallenge(formData).subscribe(
        (response) => {
          this.openSnackBar('Desafio criado com sucesso', 'Fechar');
        },
        (error) => {
          this.openSnackBar(
            'Erro ao criar desafio',
            'Fechar'
          );
        }
      );
    } else {
      console.log('Formulário inválido. Corrija os erros antes de enviar.');
    }
  }

  clean() {
    this.FormChallenge = this.setInitialForm();
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

}
