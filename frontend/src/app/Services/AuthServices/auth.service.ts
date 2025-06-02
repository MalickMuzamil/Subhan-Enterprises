import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuth = new BehaviorSubject<boolean>(false)

  get isAuth() {
    return this._isAuth.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) { }

  validateToken(): Promise<boolean> {
    return new Promise((resolve) => {
      const token = localStorage.getItem('authToken');
      console.log('token local storage se arha ha NGONINIT ke bd', token)

      if (token) {
        lastValueFrom(
          this.http.get(`${environment.apiUrl}validate`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        )
          .then((res: any) => {
            console.log('Response from backend:', res);
            console.log('Response status:', res.status);
            console.log('Response message:', res.message);
            console.log('Auth Token:', res.auth_token);
            if (res.status === 200 && res.message === "Validated") {
              console.log('Token validated:');
              resolve(true);
            }

            else {
              console.log('Condition did not match:', {
                status: res.status,
                message: res.message,
              });

              localStorage.clear();
              console.log('Token is invalid, cleared storage.');
              this.router.navigate(['/login']);
              resolve(false);
            }
          })
          .catch((err: any) => {
            localStorage.clear();
            console.error('Token validation failed:', err);
            this.router.navigate(['/login']);
            resolve(false);
          });
      }
      else {
        localStorage.clear();
        console.log('No token found, cleared storage.');
        this.router.navigate(['/login']);
        resolve(false);
      }
    });
  }

  navigateByRole() {
    const role = localStorage.getItem('role');

    const roleRouteMap: { [key: string]: string } = {
      admin: '/admin',
      user: '/home',
    };

    if (role && roleRouteMap[role]) {
      this.router.navigate([roleRouteMap[role]]);
    }

    else {
      console.log(
        'Invalid role or no role found, navigating to default route.'
      );
    }
  }

  post(endpoint: string, body: any): Observable<any> {
    return this.http.post(apiUrl + endpoint, body)
  }

  public logout() {
    localStorage.clear()
    this._isAuth.next(false);
    this.router.navigate(['/login'])
  }
}
