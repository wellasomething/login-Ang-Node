import { Component , OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { WebRequestService } from '../service/web-request.service';
import { HttpClient } from '@angular/common/http';
 import { Router} from '@angular/router'

 interface LoginResponse {
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})





export class LoginComponent implements OnInit {
  


  loginForm : FormGroup = new FormGroup({
    
  });
  formGroup: any;
  /*formData!: { email: string; password: string; };*/
  constructor(private http: HttpClient, private router: Router) {}
  hide: boolean = true;



ngOnInit(){

   function passwordValidator(control: FormControl): { [key: string]: any } | null {
     // Regex to match passwords that contain at least one uppercase letter, one lowercase letter, one digit, and are at least 8 characters long.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>/?]).{8,}$/;
    const isValid = passwordRegex.test(control.value);
    return isValid ? null : { 'invalidPassword': { value: control.value } };

    
  }

 
  
  this.loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.maxLength(50), Validators.email]),
    password : new FormControl('', [Validators.required,  Validators.minLength(8), Validators.maxLength(15), passwordValidator]),
  });
}


onLogin(){
  
  console.log(this.loginForm.value)
  this.http.post<LoginResponse>('http://localhost:4000/login', this.loginForm.value).subscribe((response: LoginResponse) => {
    const token = response.token;
    localStorage.setItem('token', token);
    this.router.navigate(['/dashboard']);
  },
  
  );
  
}
}


