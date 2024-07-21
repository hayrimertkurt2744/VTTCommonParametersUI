import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) {}

  baseUrl = "http://localhost:5194/";

  GetAllPages() : Observable<any> {
    return this.http.get(this.baseUrl+'CommonParameter/GetAllPages');
  }

  GetPageValuesById(PageNum: number, skip:number, take:number) : Observable<any> {
    return this.http.get( `${this.baseUrl}CommonParameter/GetPageValuesById/${PageNum}/${skip}/${take}` );
  }
  GetAllParamIDs(pageId:number){
    return this.http.get(`${this.baseUrl}CommonParameter/GetAllParamIDs/${pageId}`);
  }
 
  RemmoveParameterValue(rowId:number,pageId:number) : Observable<any> {
    return this.http.delete(`${this.baseUrl}CommonParameter/RemoveData/${rowId}/${pageId}`);
  }

  AddParameterValue(parameterValues: any[]): Observable<any>{
    
    return this.http.post(this.baseUrl+`CommonParameter/AddData`,parameterValues)
  }
  UpdateParameterValue(rowId:number,pageId:number,parameterValues: any[]): Observable<any>{
    
    return this.http.put(`${this.baseUrl}CommonParameter/UpdateData/${rowId}/${pageId}`,parameterValues)
  }
  GetTotalCount(pageId:number): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}CommonParameter/GetTotalCount/${pageId}`);
  }

}
