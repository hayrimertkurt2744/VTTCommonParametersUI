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

  GetPageValuesById(PageNum: number) : Observable<any> {
    return this.http.get('http://localhost:5194/CommonParameter/GetPageValuesById/' + PageNum);
  }
  GetAllParamIDs(pageId:number){
    return this.http.get(`http://localhost:5194/CommonParameter/GetAllParamIDs/${pageId}`);
  }
 
  RemmoveParameterValue() : Observable<any> {
    return this.http.delete('http://localhost:5194/CommonParameter/RemoveData/7');
  }
  // //RemoveData in .net repository
  // AddParameterValue() : Observable<any> {
  //   return this.http.post('http://localhost:5194/CommonParameter/AddData');
  // }
  AddParameterValue(parameterValues: any[]): Observable<any>{
    
    return this.http.post('http://localhost:5194/CommonParameter/AddData/'+parameterValues,parameterValues)

  }
  

}
