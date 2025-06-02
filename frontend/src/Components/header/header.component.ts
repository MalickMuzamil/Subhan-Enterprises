import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common';
import { AuthService } from '../../app/Services/AuthServices/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  constructor ( private authService: AuthService){}

  logout(): void {
   this.authService.logout()
  }
}
