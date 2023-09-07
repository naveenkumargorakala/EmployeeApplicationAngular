import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  

  constructor(private httpClient:HttpClient) { }
  
  getEmp(): Observable<any>{
    return this.httpClient.get('http://localhost:8088/employee/allemployees');
  }

  addemployee(body: any): Observable<any> {
    return this.httpClient.post('http://localhost:8088/employee/addemployee',body);
  }

  getEmployeeById(empId: number): Observable<any> {
    return this.httpClient.get('http://localhost:8088/employee/getbyid/' + empId);
  }
  
  updateEmployee(id:number,body:any):Observable<any> {
    return this.httpClient.put('http://localhost:8088/employee/updateemployee/'+id,body)
  }

  deleteEmployee(id:number):Observable<any> {
    return this.httpClient.delete('http://localhost:8088/employee/deletebyid/'+id)
  }

}
