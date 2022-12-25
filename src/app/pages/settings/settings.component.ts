import { Component, TemplateRef } from '@angular/core';
import { DbSettings } from 'src/app/services/settings.service';
import { ToastAction } from 'src/app/shared/Toast/toast-action.service';
import { ToastService } from 'src/app/services/toast.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  dbApproach: string;
  awsURL : string = "http://serverlessapi-dev.eu-west-2.elasticbeanstalk.com";

  constructor(
    private dbSettings: DbSettings,
    public toastService: ToastService,
    private _employeeService: EmployeeService 
    ) { }

  ngOnInit(): void {
    this.dbApproach = this.dbSettings.getDbApproach();
    if (this.dbApproach == null) {
      this.dbSettings.setDefaultDbApproach();
      this.dbApproach = this.dbSettings.getDbApproach();
    }
  }

  setoption(option: string) {
    this.dbSettings.setDbApproach(option);
    this.dbApproach = this.dbSettings.getDbApproach();
    this.toastService.showInfo(`Database approach set to ${option}`);
    this._employeeService.refreshDbApproach();
  }

  copy() {
    let copyText = this.awsURL
    navigator.clipboard.writeText(copyText);
    this.toastService.showInfo('Copied to clipboard');
  }


  
}
