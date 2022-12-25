import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BucketContents } from 'src/app/models/s3.model';
import { S3Service } from 'src/app/services/s3.service';
import { ToastService } from 'src/app/services/toast.service';
import { ToastAction } from 'src/app/shared/Toast/toast-action.service';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent {
  @Input() name: any;
  @Output() out = new EventEmitter<{ bucketName: string }>();

  public contents : BucketContents[];
  constructor(
    private s3Service: S3Service,
    private modalService: NgbModal,
    public _toastAction: ToastAction,
    public toastService: ToastService
  ) { }
  
  
  FilesNothing: boolean = false;
  Loading: boolean = true;
  file: File;

	openBackDropCustomClass(content: any) {
		this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
	}

  get(){
    this.Loading = true;
    this.s3Service.getBucketContents(this.name).subscribe((data: BucketContents[]) => {
      this.contents = data;
      if (this.contents.length == 0) {
        this.FilesNothing = true;
      }
      this.Loading = false;
    });
  }

  ngOnInit(): void {
    this.get();
  }

  deleteBucket(){
    this.s3Service.deleteBucket(this.name).subscribe((data: any) => {
    }, () => {
      this.toastService.showWarning('Bucket is not empty');
    });
  }

  deleteFile(key: any){
    this.s3Service.deleteBucketContent(this.name, key).subscribe((data: any) => {
      this.out.emit({ bucketName: this.name });
      console.log(data);
    });
  }

  createFile(event: any){
    console.log(this.file);
    this.s3Service.uploadFile(event.target.files[0], this.name).subscribe((data: any) => {
      this.get()
      console.log(data);
    });
  }
  
  ngOnDestroy(): void {
		this._toastAction.clear();
	}
}
