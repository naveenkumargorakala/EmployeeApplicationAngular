import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient:HttpClient) { }
  
  getEmp(): Observable<any>{
    return this.httpClient.get('http://localhost:8088/employee/allemployees');
  }

  addEmployeeData(body: any): Observable<any> {
    return this.httpClient.post('http://localhost:8088/employee/addemloyee',body);
 
  }
}
