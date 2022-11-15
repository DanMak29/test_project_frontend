import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../main.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  form!: FormGroup;
  country = new FormControl(null, [Validators.required]);
  state = new FormControl({ value: null, disabled: true }, [
    Validators.required,
  ]);
  city = new FormControl({ value: null, disabled: true }, [
    Validators.required,
  ]);
  number = new FormControl(null, [
    Validators.required,
    Validators.pattern("[0-9]{9,13}")
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
  ]);

  countries!: any;
  cities!: any;
  constructor(private fb: FormBuilder, private service: MainService, private router: Router) {
  }

  ngOnInit() {
    this.service.getCountries().subscribe(value => this.countries = value)

    this.country.valueChanges.subscribe((country) => {
      this.city.reset();
      this.city.disable();
      if (country) {
        this.service.getCities(country).subscribe(value => {
          console.log(value)
          this.cities = value
        });
        this.city.enable();
      }
    });


    this.form = this.fb.group({
      surname: ['', Validators.required],
      name: ['', Validators.required],
      email: this.email,
      number: this.number,
      city: this.city,
      country: this.country
    });
  }


  onSubmit() {
    const newEmployee = {
      surname: this.form.value.surname,
      name: this.form.value.name,
      email: this.form.value.email,
      number: this.form.value.number,
      cityId: this.form.value.city,
      countryId: this.form.value.country
    }
    this.service.saveEmployee(newEmployee).subscribe(() => {
      this.router.navigate(['/'])
    });

  }
}
