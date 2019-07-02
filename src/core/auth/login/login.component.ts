import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  successMessage: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
