import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { timeInterval } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css'],
})
export class AddEditDepComponent implements OnInit {
  constructor(private service: EmployeeService, 
    private toastService: ToastService) {}

  @Input() dep: any;
  @Output() closeModal = new EventEmitter();
  @Output() refresh = new EventEmitter();
  
  DepartmentID!: string;
  DepartmentName!: string;

  ngOnInit(): void {
    this.DepartmentID = this.dep.DepartmentID;
    this.DepartmentName = this.dep.DepartmentName;
  }

  addDepartment() {
    var val = {
      DepartmentID: this.DepartmentID,
      DepartmentName: this.DepartmentName,
    };
    this.service.addDepartment(val).subscribe((res) => {
      this.toastService.showSuccess(res.toString());
      this.refresh.emit();
      this.closeModal.emit();
    });

  }

  updateDepartment() {
    var val = {
      DepartmentID: this.DepartmentID,
      DepartmentName: this.DepartmentName,
    };
    this.service.updateDepartment(val).subscribe((res) => {
      this.toastService.showSuccess(res.toString());
      this.refresh.emit();
      this.closeModal.emit();
    });    
  }
}
