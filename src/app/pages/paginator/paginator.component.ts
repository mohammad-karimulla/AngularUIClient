import { Component, EventEmitter, Output } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  constructor(private service: EmployeeService, private _toastService: ToastService) {}

  @Output() pushTableRows = new EventEmitter<{ EmployeeList: any }>();
  
  currentPage: number = 1;
  currentPageDisplayStart: number = 1;
  currentPageDisplayEnd: number = 5;
  pageSize: number = 10;
  pageDisplayCount: number = 5;
  totalPages: number = 1;
  PageNumberList: any = [];
  totalRecords: number
  
  ngOnInit(): void {
    this.service.getEmpListCount().subscribe((count) => {

      this.totalRecords = count;
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    },()=>{
      this._toastService.showError('Error while fetching Employees data');
    });
  }

  refreshEmpList() {
    let pagingParameter = { "PageNumber": this.currentPage, "PageSize": this.pageSize };
    this.service.getEmpList(pagingParameter).subscribe((data) => {
      if (this.totalPages < this.pageDisplayCount) {
        this.pageDisplayCount = this.totalPages;
        this.currentPageDisplayEnd = this.totalPages;
      }

      if (!this.PageNumberList.includes(this.currentPage)) {
        this.PageNumberList = Array.from(
          { length: this.pageDisplayCount },
          (v, k) => k + this.currentPageDisplayStart
        );
      }

      this.pushTableRows.emit({
        EmployeeList: data,
      });
    });
  }

  fetchFirstRecords() {
    this.currentPage = 1;
    this.currentPageDisplayStart = this.currentPage;
    this.refreshEmpList();
  }

  fetchPreviousRecords(pageNum: number) {
    if (pageNum > 0) {
      this.currentPage = pageNum;

      if (!this.PageNumberList.includes(this.currentPage)) {
        this.currentPageDisplayStart =
          this.currentPageDisplayStart - this.pageDisplayCount;
        this.PageNumberList = Array.from(
          { length: this.pageDisplayCount },
          (v, k) => k + this.currentPageDisplayStart
        );
      }

      this.refreshEmpList();
    }
  }

  fetchPageRecords(pageNum: number) {
    this.currentPage = pageNum;
    this.refreshEmpList();
  }

  fetchNextRecords(pageNum: number) {
    if (pageNum <= this.totalPages) {
      this.currentPage = pageNum;

      if (!this.PageNumberList.includes(this.currentPage)) {
        this.currentPageDisplayStart =
          this.currentPageDisplayStart + this.pageDisplayCount;

        let nextDisplayCount = this.pageDisplayCount;
        if (
          this.currentPageDisplayStart + this.pageDisplayCount - 1 >
          this.totalPages
        ) {
          nextDisplayCount = this.totalPages % this.pageDisplayCount;
        }

        this.PageNumberList = Array.from(
          { length: nextDisplayCount },
          (v, k) => k + this.currentPageDisplayStart
        );
      }

      this.refreshEmpList();
    }
  }

  fetchLastRecords() {
    if (this.currentPage != this.totalPages) {
      this.currentPage = this.totalPages;

      if (!this.PageNumberList.includes(this.currentPage)) {
        let lastDisplayCount = this.totalPages % this.pageDisplayCount;
        this.currentPageDisplayStart = this.totalPages - lastDisplayCount + 1;
        this.PageNumberList = Array.from(
          { length: lastDisplayCount },
          (v, k) => k + this.currentPageDisplayStart
        );
      }

      this.refreshEmpList();
    }
  }
}
