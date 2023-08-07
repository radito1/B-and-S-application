import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../../models/fileUpload';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  pushFileToStorage(
    fileUpload: FileUpload,
    userId: string
  ): Observable<number | undefined> {
    const filePath = `profile-images/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload.url, userId);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUrl: string, userId: string): void {
    this.db.object(`users/${userId}`).update({ imageUrl: fileUrl });
  }
}
