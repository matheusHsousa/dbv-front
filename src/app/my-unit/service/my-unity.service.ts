import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyUnityService {
  member: any;
  private readonly API = 'http://localhost:8800';

  constructor(private httpClient: HttpClient) { }

  setMember(member: any) {
    this.member = member;
  }

  getMember() {
    return this.member;
  }

  getMembersByUnitId(id: any): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8800/getMembersByUnitId/${id}`)
  }

  addPoints(data: any){
    return this.httpClient.post<any>(`http://localhost:8800/addPoints`, { data })
  }
}
