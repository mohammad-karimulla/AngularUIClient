import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeComponent } from './pages/employee/employee.component';
import { DepartmentComponent } from './pages/department/department.component';
import { UploadComponent } from './pages/upload/upload.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeComponent },
  { path: '', component: DepartmentComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
