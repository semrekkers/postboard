import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    model: any = {};
    errorMsg: string = null;
    returnUrl: string;

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

    ngOnInit() {
        // reset login status
        this.authService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
      this.authService.login(this.model.username, this.model.password)
        .then(() => {
          this.router.navigate([this.returnUrl]);
        })
        .catch((err) => {
            this.errorMsg = err.error.message;
        });
    }
}
