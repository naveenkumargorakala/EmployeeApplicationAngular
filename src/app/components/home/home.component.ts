import { Component } from '@angular/core';
import { Employee } from 'src/app/model/employee.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public employeeCount:number = 2;
  public employeeDetails:Employee[]=[];

}
