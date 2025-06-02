import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './Services/AuthServices/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'subhan-enterprises';

  constructor(private http: HttpClient, private authService: AuthService) { }


  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('authToken');
      console.log('Token in localStorage on init:', token);

      this.authService.validateToken().then((isValid) => {
        if (!isValid) {
          console.log('Token validation failed or no token found in app.component.ts.');
        }
        else {
          console.log('Token validated successfully. Navigating by role...');
          this.authService.navigateByRole();
        }
      });
    }

    else {
      console.log('App is running on the server; skipping localStorage access.');
    }
  };
}
