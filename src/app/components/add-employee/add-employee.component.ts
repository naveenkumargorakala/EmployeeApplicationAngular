import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit{

  public employee:Employee = new Employee();
  employeeFormGroup: FormGroup;
  empId:number=this.activatedRoute.snapshot.params['id'];

  departments: Array<any> = [
    {id: 1, name: "HR", value: "HR", checked: false},
    {id: 2, name: "Sales", value: "Sales", checked: false},
    { id: 3, name: "Finance", value: "Finance", checked: false },
    { id: 4, name: "Engineer", value: "Engineer", checked: false },
    { id: 5, name: "Other", value: "Other", checked: false }
  ]

  // salaryForm: any;
  salary: number = 400000;
  updateSetting(event: any) {
    this.salary = event.value;
  }

  constructor(private formBuilder: FormBuilder, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private httpservice:HttpService) {
      this.employeeFormGroup = this.formBuilder.group({
        name: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z\\s]{2,}$")]),
        profilePic: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('',[Validators.required]),
        department: this.formBuilder.array([], [Validators.required]),
        salary: new FormControl('', [Validators.required]),
        startDate:"2015-09-03",
        notes: new FormControl('', [Validators.required]) 
    })
  }

dateBeforeTodayValidator() {
  return (control: { value: string | number | Date; }) => {
    const selectedDate = new Date(control.value);
    const today = new Date();

    if (selectedDate < today) {
      return null; // Valid
    } else {
      return { dateNotBeforeToday: true }; // Invalid
    }
  };
}

  onDepartmentCHange(event: any) {
    const departmentValue = event.value;
    const selectedDepartment = event.checked;
    const departmentArray: FormArray = this.employeeFormGroup.get('department') as FormArray;
  }

  onSubmit() {
    if(this.employeeFormGroup.invalid){
      if(this.employeeFormGroup.get('profilePic')?.untouched){
        this.snackBar.open('selectthe Profile Pic', '', {duration:4000, verticalPosition:'top'});
      }
      if(this.employeeFormGroup.get('gender')?.untouched) {
        this.snackBar.open('Select the Gender', '', {duration: 4000, verticalPosition: 'top'});
      }
      if(this.employeeFormGroup.get('department')?.value.length == 0) {
            this.snackBar.open('Deparment needs to be filled!', '', {duration: 4000, verticalPosition: 'top'});
      }    }
      else{
        this.employee =this.employeeFormGroup.value;
        if(this.empId!=undefined){
          this.httpservice.updateEmployee(this.empId,this.employee).subscribe(response => {
            console.log(response);
            this.ngOnInit();
            this.router.navigateByUrl("/home");
            this.snackBar.open('Updataed Successfully!','OK',{duration:4000, verticalPosition: 'top'});
          });
        }else{
          this.httpservice.addemployee(this.employee).subscribe(response => {
            console.log(response);
            this.router.navigateByUrl("/home");
            this.snackBar.open('Employee Added Successfully!',' OK', {duration:4000,verticalPosition:'top'})
          });
        }
      }
  }

  onCheckboxChange(event: MatCheckboxChange) {
    const department: FormArray = this.employeeFormGroup.get('department') as FormArray;
    if (event.checked) {
      department.push(new FormControl(event.source.value));
    } else {
      const index = department.controls.findIndex(x => x.value === event.source.value);
      department.removeAt(index);
    }
  }

    ngOnInit(): void {
        if(this.empId!=undefined) {
          this.httpservice.getEmployeeById(this.empId).subscribe(employee=>{
            console.log(employee);
              this.employeeFormGroup.get('name')?.setValue(employee.name);
              this.employeeFormGroup.get('profilePic')?.setValue(employee.profilePic);
              this.employeeFormGroup.get('email')?.setValue(employee.email);
               this.employeeFormGroup.get('phoneNumber')?.setValue(employee.phoneNumber);
              this.employeeFormGroup.get('gender')?.setValue(employee.gender);
              this.employeeFormGroup.get('salary')?.setValue(employee.salary);
              this.employeeFormGroup.get('startDate')?.setValue(employee.startDate);
              this.employeeFormGroup.get('note')?.setValue(employee.notes);
              const department:FormArray = this.employeeFormGroup.get('department') as FormArray;
              employee.department.forEach((dept: any) => {
               for(let index=0; index < this.departments.length;index++){
                if(this.departments[index].name === dept){
                  this.departments[index].checked = true;
                  department.push(new FormControl(this.departments[index].value))
                }
               }
              });
            });
          }
        }
}
