import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Base64Service } from 'src/app/shared/services/base64.service';

@Component({
  selector: 'app-dialog-pub',
  templateUrl: './dialog-pub.component.html',
  styleUrls: ['./dialog-pub.component.scss']
})
export class DialogPubComponent {
  image: any;
  mamberName: any;
  newImage: File | null = null;
  base64: any;
  dataSelectedImage: any = '';
  text: any = '';

  constructor(
    public dialogRef: MatDialogRef<DialogPubComponent>,
    private base64String: Base64Service,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.image = data.image;
    this.mamberName = data.mamberName;
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

  onNoClick(): void {
    let obj = {
      image: this.dataSelectedImage,
      text_fields: this.text
    }
    this.dialogRef.close(obj);
  }
}
