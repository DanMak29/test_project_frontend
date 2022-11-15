import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const url = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private http: HttpClient) { }

  getCountries(): Observable<any> {
    return this.http.get(url + 'countries');
  }

  getCities(id: any): Observable<any> {
    return this.http.get(url + `cities?countryId=${id}`);
  }

  saveEmployee(newEmployee: any): Observable<any> {
    return this.http.post(url + 'employees', newEmployee)
  }

  getEmployees(): Observable<any> {
    return this.http.get(url + 'employees')
  }

  getEmployeByName(name: any): Observable<any> {
    return this.http.get(url + `employees/name?name=${name}`)
  }

  delete(id: any): Observable<any> {
    return this.http.delete(url + `employees/` + id)
  }
}
