import { Injectable } from '@angular/core';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  ObjectCannedACL,
} from '@aws-sdk/client-s3';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class S3Service {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: environment.awsRegion,
      credentials: {
        accessKeyId: environment.awsAccessKeyId,
        secretAccessKey: environment.awsSecretAccessKey,
      },
    });
  }

  async uploadFile(file: File, folder: string): Promise<string> {
    const filePath = `${folder}/${Date.now()}_${file.name}`;
    const params: PutObjectCommandInput = {
      Bucket: environment.s3BucketName,
      Key: filePath,
      Body: file,
    };

    try {
      const command = new PutObjectCommand(params);
      await this.s3.send(command);
      return `https://${environment.s3BucketName}.s3.${environment.awsRegion}.amazonaws.com/${filePath}`;
    } catch (error) {
      console.error('There was an error uploading your file: ', error.message);
      throw new Error('File upload failed');
    }
  }
}
