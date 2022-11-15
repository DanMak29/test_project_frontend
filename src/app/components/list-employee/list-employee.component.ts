import { Component, OnInit } from '@angular/core';
import {MainService} from "../../main.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  form!: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'surname', 'number', 'email', 'country', "city", 'action']
  employees: any;

  constructor(private service: MainService, private fb: FormBuilder) {
  }
  ngOnInit(): void {

    this.form = this.fb.group({
      name: ''
    });
    this.form.valueChanges.subscribe(value => {
      this.getByName()
    })
    this.service.getEmployees().subscribe(value => {
      this.employees = value
    });
  }

  getByName(): void {
    if(this.form.value.name) {
      this.service.getEmployeByName(this.form.value.name).subscribe(value => {
        this.employees = value;
      })
    } else {
      this.service.getEmployees().subscribe(value => {
        this.employees = value
      });
    }
  }

  delete(id: any): void {
    console.log(id)
    this.service.delete(id).subscribe(() => {

      this.service.getEmployees().subscribe(value => {
        this.employees = value
      });
    })
  }

}
