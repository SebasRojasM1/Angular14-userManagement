import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent implements OnInit {
  userFormEdit: FormGroup; 
  isVisible: boolean = false;
  private userId!: string; // Para almacenar el ID del usuario a editar

  @Output() onSubmitUser = new EventEmitter<any>();

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userFormEdit = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  open(user: any): void {
    this.isVisible = true;
    this.userId = user._id; // Asigna el ID del usuario seleccionado
    // Llenar el formulario con los datos del usuario seleccionado
    this.userFormEdit.patchValue({
      username: user.username,
      email: user.email,
      password: '' // Puedes optar por no llenar el password si no quieres actualizarlo
    });
  }

  close(): void {
    this.isVisible = false;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.userFormEdit.valid) {
      // Llamar al método updateUser del UserService
      this.userService.updateUser(this.userId, this.userFormEdit.value).subscribe({
        next: (response) => {
          alert("User updated succesfully.")
          console.log('Usuario actualizado:', response);
          this.close();
          // Emite el evento para que el componente padre (AdminComponent) actualice la tabla
          this.onSubmitUser.emit();
        },
        error: (error) => {
          alert("Error updating the user.")
          console.error('Error al actualizar el usuario:', error);
        }
      });
    } else {
      alert("The form it`s not valid")
      console.log('El formulario no es válido');
    }
  }
}
