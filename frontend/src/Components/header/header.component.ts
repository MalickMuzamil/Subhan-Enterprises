import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  FirstName: string = '';


  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Ng On Init Chall rha');
      const token = localStorage.getItem('authToken');
      const name = localStorage.getItem('FirstName');

      if (token) {
        console.log('if1');
        this.isLoggedIn = true;
        this.FirstName = name || '';
      }

      else {
        console.log('else');
      }

      this.authService.isAuth.subscribe((auth) => {
        this.isLoggedIn = auth;
        if (auth) {
          this.FirstName = localStorage.getItem('FirstName') || '';
        }
      });
    }

  }


  ngDoCheck() {
    if (isPlatformBrowser(this.platformId)) {

      const name = localStorage.getItem('FirstName');

      if (name) {
        this.isLoggedIn = true;
        this.FirstName = name || '';
      }
    }

  }


  logout(): void {
    this.authService.logout()
  }
}
