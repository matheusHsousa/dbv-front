import { Component } from '@angular/core';
import { MyUnityService } from '../service/my-unity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-unit',
  templateUrl: './my-unit.component.html',
  styleUrls: ['./my-unit.component.scss']
})
export class MyUnitComponent {
  jsonString: any;
  getId;
  unitImage: any;
  members: any;
  rankingData: any;

  constructor( 
    private myUnityService: MyUnityService,
    private router: Router,
    ){
    this.jsonString = localStorage.getItem('userId');
    this.getId = JSON.parse(this.jsonString);
    console.log(this.getId)
    this.myUnityService.getMembersByUnitId(this.getId.id).subscribe((data)=>{
      this.unitImage = data.unit.image
      this.members = data.members;
      this.rankingData = this.members.map((item: any) =>({
        name: item.memberName,
        value: item.totalPoints
      }))
  
      console.log(this.members)
    })
   
  }

  action(member: any){
    this.myUnityService.setMember(member);
    this.router.navigate(['MyUnit/Appointments']);  }
}
