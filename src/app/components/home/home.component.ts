import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myArray: number[] = [];

  public employeeCount:number=0;
  public employeeDetails:Employee[]=[];

  constructor(private httpService:HttpService,
    private router:Router
    ){}
  

  ngOnInit(): void {
    this.httpService.getEmp().subscribe(response => {
      this.employeeDetails = response;
      this.employeeCount = this.employeeDetails.length;
      console.log(this.employeeDetails);

    } );
  }
  remove(id: number): void {
    this.httpService.deleteEmployee(id).subscribe(response => {
      console.log("deleted Succesfully");
      this.ngOnInit();
    })
  }

  update(employee: Employee){
    this.router.navigateByUrl('/add/' + employee.id);
   
    this.httpService.updateEmployee(employee.id,employee).subscribe(response => {
    })
  }
  



}
