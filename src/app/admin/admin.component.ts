import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: any[] = [];

  @ViewChild(ModalComponent) modal!: ModalComponent; // Referencia al componente Modal
  @ViewChild(UpdateModalComponent) modalUpdate!: UpdateModalComponent;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUsers()
  }

  //Obtener los usuarios y aplicarlos en la tabla.
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

  addUser(newUser: any): void {
    this.userService.createUser(newUser).subscribe({
      next: (response : any) => {
        console.log('Usuario creado con éxito:', response);
        this.fetchUsers(); // Refresca la lista de usuarios
      },
      error: (error : string) => {
        console.error('Error al crear usuario:', error);
      }
    });
  }

  deleteUser(userId: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this user?'); // Confirmación opcional
    
    if (confirmDelete) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          console.log('User deleted successfully');
          this.fetchUsers(); // Refresca la lista de usuarios
        },
        error: (error:string) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }


  //Metodos para abrir y cerrar modal
  openAddUserModal(): void {
    this.modal.open();
  }

  openEditUserModal(user: any): void {
    this.modalUpdate.open(user); // Llama al método "open" del modal y pasa el usuario
  }
}
