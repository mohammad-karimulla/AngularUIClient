import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { S3 } from 'src/app/models/s3.model';
import { S3Service } from 'src/app/services/s3.service';
import { HubConnection, HubConnectionBuilder } from '@Microsoft/signalr';
import { ToastAction } from 'src/app/shared/Toast/toast-action.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  public S3Buckets: S3[];
  private _hubConnection: HubConnection;
  constructor(
    private s3Service: S3Service,
    private modalService: NgbModal,

    private _toastAction: ToastAction,
    private _toastService: ToastService
    
  ) {}
  
  Loading: boolean = true;
  Nothing: boolean = false;
  showAlert: boolean = false;
  message: string = '';
  bucketName: '';
  type: string = '';
  activeIds: string[] =[];

  hook() {
    this._hubConnection = new HubConnectionBuilder()
    .withUrl('http://serverlessapi-dev.eu-west-2.elasticbeanstalk.com/snsHub')
    .build();
    this._hubConnection.start().catch(err => 
      this._toastService.showError('Hub Connection Error')
    );

    this._hubConnection.on('sendMessage', (message) => {
      this._toastService.showSuccess(message);
    })
  }

  getBuckets() {
    this.s3Service.getBuckets().subscribe(async (data: S3[]) => {

      this.S3Buckets = data;


      if (this.S3Buckets.length == 0) {
        this.Nothing = true;
      }
      this.Loading = false;
    }, () => {
      this._toastService.showError('Error getting buckets');
    });  
  }

  ngOnInit() {
    this.hook();
    this.getBuckets();
  }

	openBackDropCustomClass(content: any) {
		this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
	}

  createBucket(){
    this.s3Service.createBucket(this.bucketName).subscribe((data: S3) => {
      this.S3Buckets.push(data);
      this.Loading = false;
    }, (error) => {
      this._toastService.showWarning('Bucket already exists');
    });
  }

  deletedRefresh(eventData: { bucketName: string }){
    this.S3Buckets = this.S3Buckets.filter((item) => item.BucketName !== eventData.bucketName);
  }
  
  ngOnDestroy(): void {
		this._toastAction.clear();
	}

}
