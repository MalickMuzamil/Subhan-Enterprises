import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../Services/AuthServices/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  userInput: String = '';
  isLoading = false;

  constructor(private authService: AuthService) { }

  onSubmit() {
    console.log(this.userInput)

    this.isLoading = true;
    this.authService.post('reset-password', { email: this.userInput }).subscribe({
      next: (res: any) => {
        console.log(res)
        Swal.fire({
          icon: 'success',
          title: 'Signup Successful!',
          text: res.data?.message,
          confirmButtonText: 'OK',
        })
      },
      error: (err) => {
        console.log(err)
        this.isLoading = false;
      }
    })
  }

}
