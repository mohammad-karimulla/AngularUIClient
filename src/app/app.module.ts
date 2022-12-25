import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './pages/department/department.component';

import { AddEditDepComponent } from './pages/department/add-edit-dep/add-edit-dep.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { AddEditEmpComponent } from './pages/employee/add-edit-emp/add-edit-emp.component';
import { EmployeeService } from './services/employee.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './pages/paginator/paginator.component';
import { UploadComponent } from './pages/upload/upload.component';
import { BucketComponent } from './pages/upload/bucket/bucket.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingsComponent } from './pages/settings/settings.component';
import { ToastsContainer } from './shared/Toast/toasts-container.component';


@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    AddEditDepComponent,
    EmployeeComponent,
    AddEditEmpComponent,
    PaginatorComponent,
    UploadComponent,
    BucketComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastsContainer,
    BrowserAnimationsModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
