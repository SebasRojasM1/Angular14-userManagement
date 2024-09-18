import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/user/all';

  constructor(private http: HttpClient) { }

  // Método para obtener la lista de usuarios desde la API
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
