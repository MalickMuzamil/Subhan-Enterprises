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

      if (!token) {
        console.warn('No token found.');
        localStorage.clear();
        this.router.navigate(['/home']);
        return resolve(false);
      }

      lastValueFrom(
        this.http.get(`${environment.apiUrl}validate`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
        .then((res: any) => {
          if (res?.status === 200 && res?.message === "Validated") {
            this._isAuth.next(true);
            resolve(true);
          }
          else {
            console.warn('Token invalid. Response:', res);
            localStorage.clear();
            this.router.navigate(['/login']);
            resolve(false);
          }
        })
        .catch((err) => {
          console.error('Validation error:', err);
          localStorage.clear();
          this.router.navigate(['/login']);
          resolve(false);
        });
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
    this.router.navigate(['/home'])
  }
}
