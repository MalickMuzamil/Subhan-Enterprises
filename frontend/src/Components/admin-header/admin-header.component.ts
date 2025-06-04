import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common';
import { AuthService } from '../../app/Services/AuthServices/auth.service';


@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  isLoggedIn: boolean = false;
  FirstName: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    this.isLoggedIn = !!token;

    this.FirstName = localStorage.getItem('FirstName') || '';
  }

  logout(): void {
    this.authService.logout()
  }

}
