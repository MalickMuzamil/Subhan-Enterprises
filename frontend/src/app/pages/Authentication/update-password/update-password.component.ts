import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../Services/AuthServices/auth.service'

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {
  newPassword: String = '';
  confirmPassword: String = '';
  token?: string;
  errorMessage: String = '';
  isLoading = false;


  constructor(private route: ActivatedRoute, private router: Router, private authServices: AuthService) { }

  ngOnInit() {
    this.token = this.route.snapshot.queryParams['token'];
    if (!this.token) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
  }

  onUpdatePassword() {
    this.isLoading = true;
    this.authServices.post('update-passsword', { token: this.token, newPassword: this.newPassword }).subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
        this.isLoading = false;
      }
    })
  }



}
