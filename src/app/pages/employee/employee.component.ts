import { Component, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastService } from 'src/app/services/toast.service';
import { ToastAction } from 'src/app/shared/Toast/toast-action.service';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  constructor(
    private service: EmployeeService
  ) {}

  @ViewChild(PaginatorComponent) child: PaginatorComponent | undefined;

  EmployeeList: any = [];

  ModalTitle: string | undefined;
  ActivateAddEditEmpComp: boolean = false;
  emp: any;
  Loading: boolean = true;
  Nothing: boolean = false;
  NetworkIssue: boolean = false;
  BodyShow: boolean = false;

  ngOnInit(): void {
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    this.child?.refreshEmpList();
  }

  RaiseNetworkIssue($event: any){
    if ($event.type === 'error'){
      this.NetworkIssue = true;
      this.Loading = false;
      this.Nothing = false;
      this.BodyShow = false;
    }
    else {
      this.NetworkIssue = false;
      this.Loading = false;
      this.Nothing = true;
      this.BodyShow = false;
    }
  }

  addClick() {
    this.emp = {
      EmployeeID: 0,
      EmployeeName: '',
      Department: '',
      DateOfJoining: '',
      PhotoFileName: 'anonymous.png',
    };
    this.ModalTitle = 'Add Employee';
    this.ActivateAddEditEmpComp = true;
  }

  editClick(item: any) {
    this.emp = item;
    this.ModalTitle = 'Edit Employee';
    this.ActivateAddEditEmpComp = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteEmployee(item.EmployeeID).subscribe((data) => {
        alert(data.toString());
        this.ngAfterViewInit();
      });
    }
  }

  closeClick() {
    document.getElementById('closeBtn')?.click();
    this.ActivateAddEditEmpComp = false;
    this.ngAfterViewInit();
  }

  onEmployeesFetch(eventData: { EmployeeList: any }) {
    this.EmployeeList = eventData.EmployeeList;
    if (this.EmployeeList.length === 0) {
      this.Nothing = true;
      this.BodyShow = false;
    }
  }
 

 
}
