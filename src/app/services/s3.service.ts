import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BucketContents, S3 } from "../models/s3.model";

@Injectable({
  providedIn: "root",
})
export class S3Service {
  constructor(private http: HttpClient) {}

  development_url = "http://localhost:5001/api/";
  production_url = "https://xyz.com/api/";

  // Buckets

  getBuckets(): Observable<S3[]> {
    return this.http.get<S3[]>(this.development_url + "buckets/get-all");
  }

  createBucket(bucketName: string): Observable<S3> {
    return this.http.post<S3>(
      this.development_url + "buckets/create?bucketName=" + bucketName,
      null
    );
  }

  deleteBucket(bucketName: string): Observable<S3> {
    return this.http.delete<S3>(
      this.development_url + "buckets/delete?bucketName=" + bucketName
    );
  }

  // Files

  getBucketContents(bucketName: string): Observable<BucketContents[]> {
    return this.http.get<BucketContents[]>(
      this.development_url + "files/get-all?bucketName=" + bucketName
    );
  }

  deleteBucketContent(bucketName: string, itemName: string): Observable<any> {
    return this.http.delete(
      this.development_url +
        "files/delete?bucketName=" +
        bucketName +
        "&key=" +
        itemName
    );
  }

  uploadFile(file: File, bucketName: string): Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post(
      this.development_url + "files/upload?bucketName=" + bucketName,
      formData
    );
  }
}
