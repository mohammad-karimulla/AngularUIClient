import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DbSettings } from "./settings.service";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  constructor(private http: HttpClient, private _dbSettings: DbSettings) {}

  /*
  // api url to call api methods which interact with DB using ADO connections
  readonly APIUrl = 'http://localhost:5000/api/ado';
  // api url to call api methods which interact with DB using Code First - Core Entity Framework
  readonly APIUrl = 'http://localhost:5000/api/codefirst';
  // api url to call api methods which interact with DB using Database First - Core Entity Framework 
  */

  DBApproach: string = this._dbSettings.getDbApproach().replace(/\s/g, "");
  //APIUrlPrefix = "http://dbwebapi-prod.eu-west-2.elasticbeanstalk.com/api/";
  APIUrlPrefix = "http://localhost:5000/api/";
  APIUrl = this.APIUrlPrefix + this.DBApproach.toLowerCase();
  readonly PhotoUrl = "http://localhost:5000/Photos/";

  refreshDbApproach() {
    this.DBApproach = this._dbSettings.getDbApproach().replace(/\s/g, "");
    this.APIUrl = this.APIUrlPrefix + this.DBApproach.toLowerCase();
  }

  getDepList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + "/Department");
  }

  addDepartment(val: any) {
    return this.http.post(this.APIUrl + "/Department", val);
  }

  updateDepartment(val: any) {
    return this.http.put(this.APIUrl + "/Department", val);
  }

  deleteDepartment(val: any) {
    return this.http.delete(this.APIUrl + "/Department/" + val);
  }

  getEmpList(val: any): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + "/Employee", { params: val });
  }

  getEmpListCount(): Observable<number> {
    return this.http.get<number>(this.APIUrl + "/Employee/Get-All-Count");
  }

  addEmployee(val: any) {
    return this.http.post(this.APIUrl + "/Employee", val);
  }

  updateEmployee(val: any) {
    return this.http.put(this.APIUrl + "/Employee", val);
  }

  deleteEmployee(val: any) {
    return this.http.delete(this.APIUrl + "/Employee/" + val);
  }

  uploadPhoto(val: any) {
    return this.http.post(this.APIUrl + "/Employee/SaveFile", val);
  }

  getAllDepartmentNames(): Observable<any[]> {
    return this.http.get<any>(
      this.APIUrl + "/Department/GetAllDepartmentNames"
    );
  }
}
