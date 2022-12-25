export interface S3 {
    BucketName: string;
}

export interface BucketContents {
    Name: string;
    PresignedUrl: string;  
}