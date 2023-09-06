import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public employeeCount:number=0;
  public employeeDetails:Employee[]=[];

  constructor(private httpService:HttpService){}
  ngOnInit(): void {
    this.httpService.getEmp().subscribe(response => {
      this.employeeDetails = response;
      this.employeeCount = this.employeeDetails.length;
      console.log(this.employeeDetails);
      
    } );
  }
  remove(id: number): void {
    // this.httpService.deleteEmployeeData(id).subscribe(response => {
    //   console.log(response);
    //   this.ngOnInit();
    //   this.snackBar.open('Deleted Successfully!', '', {duration: 4000, verticalPosition: 'top'});
    // });
  }

  update(employee: Employee): void {
    // this.dataService.changeEmployee(employee);
    // this.router.navigateByUrl('/add/' + employee.id);
    // this.httpService.updateEmployeData(employee.id, employee).subscribe(response => {
    //   console.log(response);
    //   this.ngOnInit();
    // });
  }
}
