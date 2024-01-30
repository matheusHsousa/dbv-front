import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  isAuthenticated: boolean = false;
  challengeId: any;

  private readonly API = 'http://localhost:8800';

  constructor(private httpClient: HttpClient) { }

  list(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API}/getcustomersByPage`);
  }

  getChallenges(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.API}/getChallenges`);
  }

  filterByCategory(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.API}/filterCategory`, data);
  }

  getCategorias(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:8800/getCategorias');
  }

  getChallengeById(id: any): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8800/getChallengeById/${id}`)
  }

  setChallengeId(member: any) {
    this.challengeId = member;
  }

  getChallengeId() {
    return this.challengeId;
  }

  getMembersbyId(id: any): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8800/getMembersbyId/${id}`)
  }

  createPublications(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.API}/createPublications`, data);
  }

  getublicationsbyId(challengeId: any): Observable<any>{
    return this.httpClient.get<any>(`${this.API}/getPublicationsById/${challengeId}`)
  }

  postLike(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.API}/postLike`, data);
  }

  getLikes(publicationId: string): Observable<any> {
    return this.httpClient.get(`${this.API}/getLikes?publicationId=${publicationId}`);
  }

  checkUserLike(userId: string, publicationId: string): Observable<any> {
    return this.httpClient.get(`${this.API}/checkUserLike?userId=${userId}&publicationId=${publicationId}`);
  }

  chellengePoints(data: any): Observable<any> {
    return this.httpClient.put<any>('http://localhost:8800/chellengePoints', data);
  }

  getChallengePoints(userId: any, challengerId: any): Observable<any>{
    return this.httpClient.get<any>(`${this.API}/getChallengePoints?userId=${userId}&challengerId=${challengerId}`)
  } 

  getAllMembersWithPoints(): Observable<any>{
    return this.httpClient.get<any>(`${this.API}/getAllMembersWithPoints`)
  } 
}
