import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Services/AuthServices/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, SweetAlert2Module, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})



export class SignUpComponent implements OnInit {
  SignUpform!: FormGroup;
  submitted = false;
  show: boolean = false;
  confirmshow: boolean = false;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.SignUpform = this.formBuilder.group(
      {
        firstname: ['', [Validators.required, Validators.minLength(5)]],
        lastname: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
        confirmPassword: ['', Validators.required],
        validator: this.passwordsMatchValidator,
      }
    );

  }

  passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    console.log(password)

    const confirmPassword = group.get('confirmPassword')?.value;
    console.log('Confirm pass', confirmPassword)

    if (password?.value !== confirmPassword?.value) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  get error(): { [key: string]: AbstractControl } {
    return this.SignUpform.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.SignUpform.invalid) {
      return;
    }
    console.log('Form submitted successfully:', this.SignUpform.value);

    this.isLoading = true;
    this.authService.post('signup', this.SignUpform.value).subscribe({
      next: (res: any) => {
        if (res.status === 201) {
          if (res.auth_token) {
            localStorage.setItem('authToken', res.auth_token);
            localStorage.setItem('role', res.data?.role)
          }
          Swal.fire({
            icon: 'success',
            title: 'Signup Successful!',
            text: res.data?.message,
            confirmButtonText: 'OK',
            customClass: {
              popup: 'custom-red-background',
            },
          });
          console.log(res)
        }

        // else if (res.status === 400) {
        //   Swal.fire({
        //     icon: "error",
        //     title: "Oops...",
        //     text: res.data?.message,
        //   });
        // }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  checkpassword() {
    this.show = !this.show;
  }

  checkConfirmPassword() {
    this.confirmshow = !this.confirmshow;
  }

}
