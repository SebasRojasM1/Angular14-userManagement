import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://usersapi-x9ra.onrender.com';

  constructor(private http: HttpClient) { }

  // Método para obtener la lista de usuarios desde la API
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/all`);
  }

  //Metodo para crear un usuario nuevo
  createUser(user: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/create`, user);
  }

  //Metodo para editar un usuario seleccionado
  updateUser(userId: string, user: { username: string, email: string, password: string }): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/user/update/${userId}`, user);
  }

  //Metodo para eliminar un usuario seleccionado
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/delete/${userId}`);
  }
}
