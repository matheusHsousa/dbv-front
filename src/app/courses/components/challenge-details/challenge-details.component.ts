import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-challenge-details',
  templateUrl: './challenge-details.component.html',
  styleUrls: ['./challenge-details.component.scss']
})
export class ChallengeDetailsComponent implements OnInit {
  id: any;
  challengeData: any = '';
  
  constructor(
    private service: CoursesService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    
    this.id = this.service.getChallengeId()
    this.service.getChallengeById(this.id).subscribe((data)=>{
      this.challengeData = data;
    })
  }

  publicate(){
    this.service.setChallengeId(this.id)
    this.router.navigate(['courses/publications']);
  }
}
