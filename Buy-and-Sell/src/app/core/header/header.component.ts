import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

    logout() {
      this.authService.logOut();
      this.snackBar.open('Successful logout!');
      this.router.navigate(['/']);
    }

  // logout() {
  //   this.authService.logout().subscribe((err) => {
  //     console.log(err)
  //     this.snackBar.open(
  //       'There was a problem while trying to logout'
  //     );
  //   },
  //   () => {
  //     this.snackBar.open('Successful logout!');
  //     this.router.navigate(['/']);
  //   }
  // );
  // }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true: false;
  }

  
}
