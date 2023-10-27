import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidators } from 'src/app/helpers/custom-validators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userTerms!: false;
  registerForm!: FormGroup;
  
  constructor(private router: Router, private state$: Store, private authServise: AuthService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl("",[Validators.email, Validators.required]),
      firstName: new FormControl("",[Validators.required]),
      lastName: new FormControl("",[Validators.required]),
      password: new FormControl("",[
        Validators.required,
        CustomValidators.patternValidator(/[a-zA-Z]/,{noAlphabeticCharacters:true}),
        CustomValidators.patternValidator(/[0-9]/,{noNumericCharacters: true}),
        CustomValidators.patternValidator(/[!@\$%\^\&*\)\(+=._-]/,{noSpecialCharacters:true}),
        Validators.minLength(8)
      ]),
      userRePassword: new FormControl("",[
        Validators.required,
        CustomValidators.patternValidator(/[a-zA-Z]/,{noAlphabeticCharacters:true}),
        CustomValidators.patternValidator(/[0-9]/,{noNumericCharacters: true}),
        CustomValidators.patternValidator(/[!@\$%\^\&*\)\(+=._-]/,{noSpecialCharacters:true}),
        Validators.minLength(8)
      ]),
      userTerms: new FormControl(false, [Validators.required])
    });
  }

  registerUser(){
    if(this.registerForm.valid){
      this.authServise.registerUser(this.registerForm.value);
    }
  }
}
