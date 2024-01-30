import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyProfileService {

  constructor(private httpClient: HttpClient) { }

  getMembersbyId(id: any): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8800/getMembersbyId/${id}`)
  }

  editMember(editMember: any): Observable<any> {
    return this.httpClient.put<any>('http://localhost:8800/editMember', editMember);
  }
}
