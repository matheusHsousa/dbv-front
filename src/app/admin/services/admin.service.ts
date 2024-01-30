import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  challengeData: any;
  member: any;


  constructor(private httpClient: HttpClient) { }


  creatChallenge(challenge: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8800/creatChallenge', challenge);
  }
  
  getCustomers(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:8800/getcustomers');
  }

  getCategorias(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:8800/getCategorias');
  }

  getRoles(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:8800/getRoles');
  }

  editEstabelecimento(editCustomer: any): Observable<any> {
    return this.httpClient.put<any>('http://localhost:8800/editCustomerViewAdm', editCustomer);
  }

  deleteEstabelecimento(deletedCustomer: any): Observable<any> {
    return this.httpClient.put<any>('http://localhost:8800/deleteCustomer', deletedCustomer);
  }

  getAddressByCep(cep: string): Observable<any> {
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
    return this.httpClient.get(apiUrl);
  }

  getChallenges(): Observable<any[]>{
    return this.httpClient.get<any[]>(`http://localhost:8800/getChallenges`);
  }

  getChallengeById(id: any): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8800/getChallengeById/${id}`)
  }

  updateChallenge(editChallenge: any): Observable<any> {
    return this.httpClient.put<any>('http://localhost:8800/updateChallenge', editChallenge);
  }

  registerMember(member: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8800/registerMember', member);
  }


  getPositions(): Observable<any[]>{
    return this.httpClient.get<any[]>(`http://localhost:8800/getPositions`);
  }
  
  getMembers(): Observable<any[]>{
    return this.httpClient.get<any[]>(`http://localhost:8800/getMembers`);
  }
  
  getInactiveMembers(): Observable<any[]>{
    return this.httpClient.get<any[]>(`http://localhost:8800/getInactiveMembers`);
  }

  setMember(member: any) {
    this.member = member;
  }

  getMember() {
    return this.member;
  }

  getMembersbyId(id: any): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8800/getMembersbyId/${id}`)
  }

  editMember(editMember: any): Observable<any> {
    return this.httpClient.put<any>('http://localhost:8800/editMember', editMember);
  }

  getStatusMember(id: any): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8800/getStatusMember/${id}`)
  }

  changeStatus(data: any): Observable<any>{
    return this.httpClient.put<any>(`http://localhost:8800/changeStatus/`, data)
  }

  filterMemberName(data: any): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8800/filterMemberName`, data);
  }

  filterMemberNameInactive(data: any): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8800/filterMemberNameInactive`, data);
  }

  getUnits(): Observable<any[]>{
    return this.httpClient.get<any[]>(`http://localhost:8800/getUnits`);
  }

  createUnit(data: any): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8800/createUnit`, data);
  }

  getUnitbyId(id: any): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8800/getUnityById/${id}`)
  }

  updateUnit(data: any): Observable<any>{
    return this.httpClient.put<any>(`http://localhost:8800/updateUnit/`, data)
  }


  getTools(): Observable<any[]>{
    return this.httpClient.get<any[]>(`http://localhost:8800/getTools`);
  }

  createTool(data: any): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8800/createTool`, data);
  }

  getToolsById(id: any): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8800/getToolsById/${id}`)
  }

  updateTools(data: any): Observable<any>{
    return this.httpClient.put<any>(`http://localhost:8800/updateTools/`, data)
  }

  updateStatusTools(data: any): Observable<any>{
    return this.httpClient.put<any>(`http://localhost:8800/updateT/`, data)
  }

  getNameUnits(): Observable<any[]>{
    return this.httpClient.get<any[]>(`http://localhost:8800/getNameUnits`);
  }

  createEstabelecimento(estabelecimentoData: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8800/creatEstabelicimento', estabelecimentoData);
  }

  getCustumerById(id: number): Observable<any[]> {
    const url = `http://localhost:8800/getcustomersById/${id}`;
    return this.httpClient.get<any[]>(url);
  }

  private formEditValuesSource = new BehaviorSubject<any>(null);
  formEditValues$ = this.formEditValuesSource.asObservable();

  setFormEditValues(values: any) {
    this.formEditValuesSource.next(values);
  }

  getStatus(id: number): Observable<any[]> {
    const url = `http://localhost:8800/getStatus/${id}`;
    return this.httpClient.get<any[]>(url);
  }

  setStatus(status: any): Observable<any> {
    return this.httpClient.put<any>('http://localhost:8800/deleteCustomer', status);
  }

  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post('sua/url/de/upload', formData);
  }
  
  getProfilePicture(id: number): Observable<any[]>{
    const url = `http://localhost:8800/getProfilePicture/${id}`;
    return this.httpClient.get<any[]>(url);
  }

  getFotos(id: number): Observable<any[]>{
    const url = `http://localhost:8800/getFotos/${id}`;
    return this.httpClient.get<any[]>(url);
  }

  editProfilePicture(editProfilePicture: any): Observable<any> {
    return this.httpClient.put<any>('http://localhost:8800/editProfilePicture', editProfilePicture);
  }
  
  addphotos(fotos: any): Observable<any>{
    return this.httpClient.put<any>('http://localhost:8800/editPhotos', fotos);
  }

  deleteImage(value: any): Observable<any[]>{
    return this.httpClient.put<any[]>(`http://localhost:8800/deleteImage`, value)
  }
}
