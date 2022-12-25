import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {

  constructor(private service: EmployeeService,
    private toastService: ToastService) {}

  DepartmentList: any = [];

  ModalTitle: string | undefined;
  ActivateAddEditDepComp: boolean = false;
  dep: any;

  DepartmentIDFilter: string = '';
  DepartmentNameFilter: string = '';
  DepartmentListWithoutFilter: any = [];
  Loading: boolean = true;
  Nothing: boolean = false;
  NetworkIssue: boolean = false;

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick() {
    this.dep = {
      DepartmentID: 0,
      DepartmentName: ''
    };
    this.ModalTitle = 'Add Department';
    this.ActivateAddEditDepComp = true;
  }

  editClick(item: any) {
    this.dep = item;
    console.log(this.dep);
    this.ModalTitle = 'Edit Department';
    this.ActivateAddEditDepComp = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteDepartment(item.DepartmentID).subscribe((data) => {
        this.toastService.showSuccess(data.toString());
        this.refreshDepList();
      });
    }
  }



  closeClick() {
    document.getElementById('closeBtn')?.click();
    this.ActivateAddEditDepComp = false;
    this.refreshDepList();
  }

  refreshDepList() {
    this.service.getDepList().subscribe((data) => {
      this.DepartmentList = data;
      this.DepartmentListWithoutFilter = data;
      this.Loading = false;
    },()=>{
      this.toastService.showError('Error while fetching Departments data');
      this.Loading = false;
      this.NetworkIssue = true;
    });
  }

  FilterFn() {
    var DepartmentIdFilter = this.DepartmentIDFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function (
      el: any
    ) {
      return (
        el.DepartmentID.toString()
          .toLowerCase()
          .includes(DepartmentIdFilter.toString().trim().toLowerCase()) &&
        el.DepartmentName.toString()
          .toLowerCase()
          .includes(DepartmentNameFilter.toString().trim().toLowerCase())
      );
    });
  }

  sortResult(prop: any, asc: any) {
    this.DepartmentList = this.DepartmentListWithoutFilter.sort(function (
      a: any,
      b: any
    ) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });
  }
}
