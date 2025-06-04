import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { AuthService } from '../../../Services/AuthServices/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  SignInform!: FormGroup;
  submitted = false;
  password = HTMLInputElement;
  show: boolean = false;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private AuthServices: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.SignInform = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10),],],
      }
    );
  }

  get error(): { [key: string]: AbstractControl } {
    return this.SignInform.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.SignInform.invalid) {
      return;
    }
    console.log('Login-Form submitted successfully:', this.SignInform.value);

    this.isLoading = true
    this.AuthServices.post('login', this.SignInform.value).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          if (res.auth_token) {
            localStorage.setItem('authToken', res.auth_token);
            localStorage.setItem('role', res.data?.role)
            localStorage.setItem('FirstName', res.data?.firstname)
          }
          Swal.fire({
            icon: 'success',
            title: res.message,
            timer: 3000,
            showConfirmButton: false,
            customClass: {
              popup: 'custom-orange-background'
            },
            timerProgressBar: true
          }).then(() => {
            // this.router.navigate(['/home']);
            const role = res.data?.role;
            if (role === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/home']);
            }
          });
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  checkpassword() {
    this.show = !this.show;
  }

}
