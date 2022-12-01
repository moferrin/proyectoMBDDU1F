import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DatosService } from 'src/app/services/datos/datos.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent  {

  user = {'email': '', 'password': ''};

  constructor( public authService: AuthService,
    public router: Router,
    public datos:DatosService) { 
    }


  


  signIn() {
      this.authService.signInUser(this.user)
        .subscribe(
          res => {
            console.log(res);
            localStorage.setItem('token', res.token);
            this.datos.setUser(res.idd);
            this.router.navigate(['/facturacion']);
          },
          err => console.log(err)
        )
  }
}
