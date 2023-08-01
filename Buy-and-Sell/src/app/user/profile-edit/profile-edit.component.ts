import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { UserService } from 'src/app/shared/services/user/user.service';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent {
  user$ = this.usersService.currentUserProfile$;

  editProfileForm = this.fb.group({
    displayName: [''],
    firstName: [''],
    lastName: [''],
    phone: [''],
    address: [''],
    description: [''],
  });

  constructor(
    private fb: FormBuilder,
    private usersService: UserService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.editProfileForm.invalid) {
      return;
    }

    const updatedProfileData = this.editProfileForm.value;

    this.usersService.currentUserProfile$.pipe(take(1)).subscribe((user) => {
      if (user && user.uid) {
        this.usersService
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

}
