import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {

  employeeFormGroup: FormGroup;

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
    private snackBar: MatSnackBar) {
      this.employeeFormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z\\s]{2,}$")]),
      profilePic: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      department: this.formBuilder.array([], [Validators.required]),
      salary: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required, this.dateBeforeTodayValidator()]),
      note: new FormControl('', [Validators.required]) 
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
    const dataString = JSON.stringify(this.employeeFormGroup.value);
    localStorage.setItem('formData', dataString);
    this.employeeFormGroup.reset();
    console.log(dataString)
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

    


}
