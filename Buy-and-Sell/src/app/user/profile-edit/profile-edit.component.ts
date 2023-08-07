import { Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { FileUpload } from 'src/app/shared/models/fileUpload';
import { User } from 'src/app/shared/models/user';
import { FileUploadService } from 'src/app/shared/services/image-upload/image-upload.service';

import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent {
  selectedImage: any = null;
  imageUrl: string | null = null;

  user$ = this.userService.currentUserProfile$;

  editProfileForm = this.fb.group({
    displayName: [''],
    firstName: [''],
    lastName: [''],
    phone: [''],
    address: [''],
    description: [''],
    imageUrl: [''],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private uploadService: FileUploadService
  ) {}
  // Update profile
  // onSubmit() {
  //   if (this.editProfileForm.invalid) {
  //     return;
  //   }

  //   const updatedProfileData = this.editProfileForm.value;

  //   this.userService.currentUserProfile$.pipe(take(1)).subscribe((user) => {
  //     if (user && user.uid) {
  //       this.userService
  //         .updateUserProfile(updatedProfileData, user.uid)
  //         .subscribe(() => {
  //           this.router.navigate([`/profile`]);
  //           //TODO
  //           // Optionally, you can handle success or display a message
  //         });
  //     } else {
  //       // Handle the scenario accordingly (e.g., show an error message or redirect to login)
  //       console.log('User is not authenticated or user ID is empty.');
  //     }
  //   });
  // }
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  //Upload data to storage and database.

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      

      if (file) {
        this.user$.pipe(take(1)).subscribe((user)=>{
          this.currentFileUpload = new FileUpload(file);
          this.uploadService.pushFileToStorage(this.currentFileUpload, user!.uid);          
        });        
      }
    }

      if (this.editProfileForm.invalid) {
            return;
          }
      
          const updatedProfileData = this.editProfileForm.value;
      
          this.userService.currentUserProfile$.pipe(take(1)).subscribe((user) => {
            if (user && user.uid) {
              this.userService
                .updateUserProfile(updatedProfileData, user.uid)
                .subscribe(() => {
                  this.router.navigate([`/profile`]);
                  //TODO
                  // Optionally, you can handle success or display a message
                });
            } else {
              // Handle the scenario accordingly (e.g., show an error message or redirect to login)
              console.log('User is not authenticated or user ID is empty.');
            }
          });


    
  }

  // onSubmit() {
  







  //   if (this.editProfileForm.invalid || !this.currentFileUpload) {
  //     return;
  //   }

  //   const updatedProfileData = { ...this.editProfileForm.value };

  //   this.uploadService
  //     .pushFileToStorage(this.currentFileUpload)
  //     .subscribe((imageUrl) => {
  //       if (typeof imageUrl === 'string') {
  //         // Make sure imageUrl is of type string
  //         updatedProfileData.imageUrl = imageUrl;

  //         this.userService.currentUserProfile$
  //           .pipe(take(1))
  //           .subscribe((user) => {
  //             if (user && user.uid) {
  //               this.userService
  //                 .updateUserProfile(updatedProfileData, user.uid)
  //                 .subscribe(() => {
  //                   this.router.navigate(['/profile']);
  //                   // Optionally, you can handle success or display a message
  //                 });
  //             } else {
  //               // Handle the scenario accordingly (e.g., show an error message or redirect to login)
  //               console.log('User is not authenticated or user ID is empty.');
  //             }
  //           });
  //       }
  //     });
  // }
}
