import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { UserService } from '../shared/user.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    model: any = {};
    errorMsg: string = null;
    returnUrl: string;

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private userService: UserService) { }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/posts';
    }

    login() {
      this.authService.logout();
      this.userService.clearCache();
      this.authService.login(this.model.username, this.model.password)
        .then(() => {
          this.userService.getCurrentUser();
          this.router.navigate([this.returnUrl]);
        })
        .catch((err) => {
            this.errorMsg = err.error.message;
        });
    }
}
