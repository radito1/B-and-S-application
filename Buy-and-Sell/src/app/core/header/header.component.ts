import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;

  constructor(
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private usersService: UserService,
  ) {}

  ngOnInit(): void {
    
  }
    logout() {
      this.authService.logOut().then(()=>{
        this.snackBar.open('Successful logout!');
        this.router.navigate(['/']);
      }).catch((err)=>{
        this.snackBar.open('There was a problem while trying to logout!');
      })
    }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true: false;
  }

  
  
}
