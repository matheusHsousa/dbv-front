import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Base64Service } from 'src/app/shared/services/base64.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.scss']
})
export class ChallengeListComponent {
  cardDataList: any;
  FormChallenge: FormGroup;
  panelAberto: any; 
  dataSelectedImage: any
  newImage: File | null = null;

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder, 
    private base64String: Base64Service,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    ){
      this.adminService.getChallenges().subscribe((data)=>{
        this.cardDataList = data;
      })

      this.FormChallenge = this.setInitialForm();
    }

  action(value: any) {
    this.adminService.getChallengeById(value).subscribe((data) => {
      this.adminService.challengeData = data;
      this.dataSelectedImage = data.image
      this.FormChallenge.patchValue({
        title: data.title,
        description_ch: data.description_ch,
        points: data.points,
        deadLine: data.deadLine
      });
    });
  }

  onFileSelected(event: any) {
    this.newImage = event.target.files[0];

    if (this.newImage) {
      this.base64String.fileToBase64(this.newImage).then((base64String) => {
        this.dataSelectedImage = base64String;
      });
    }
  }

 setInitialForm() { 
    return this.formBuilder.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      description_ch: ['', Validators.required],
      points: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      deadLine: ['', [Validators.required]]
  })}


  onPanelOpened(cardData: any): void {
    this.panelAberto = cardData;
  }

  onPanelClosed(): void {
    this.panelAberto = null;
  }


  save(id: any){
    const formData = this.FormChallenge.value;
      formData.deadLine = this.datePipe.transform(formData.deadLine, 'yyyy-MM-dd');
      formData.image = this.dataSelectedImage;
      formData.id = id;

    this.adminService.updateChallenge(formData).subscribe(
      (response) => {
        this.openSnackBar('Desafio criado com sucesso', 'Fechar');
      },
      (error) => {
        this.openSnackBar(
          'Erro ao criar desafio',
          'Fechar'
        );
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
