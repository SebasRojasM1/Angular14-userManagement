import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string){
    return this.http.post(this.apiUrl, { email, password })
    .pipe(
      tap((response: any) => {
        // Almacenar el token en el localStorage
        localStorage.setItem("token", response.token);
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem("token") !== null;
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem("token");
  }
}
