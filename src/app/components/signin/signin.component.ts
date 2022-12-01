import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent  {

  user = {'email': '', 'password': ''};

  constructor( public authService: AuthService,
    public router: Router) { }

  


  signIn() {
      this.authService.signInUser(this.user)
        .subscribe(
          res => {
            console.log(res);
            localStorage.setItem('token', res.token);
            this.router.navigate(['/productos']);
          },
          err => console.log(err)
        )
  }
}
