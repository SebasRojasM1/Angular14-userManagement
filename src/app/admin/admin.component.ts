import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: any[] = [];

  @ViewChild(ModalComponent) modal!: ModalComponent; // Referencia al componente Modal

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUsers()
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log(this.users);
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }

  openAddUserModal(): void {
    this.modal.open();
  }

  openEditUserModal(): void {
    this.modal.open();
  }

  
}
