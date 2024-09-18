import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  userForm: FormGroup; 
  isVisible: boolean = false; // Controla la visibilidad del modal

  @Output() onSubmitUser = new EventEmitter<any>();

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   }

  ngOnInit(): void { }


  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.userForm.valid) {
      const { username, email, password } = this.userForm.value;

      this.userService.createUser({ username, email, password }).subscribe({
        next: (response) => {
          console.log('Usuario creado con éxito:', response);
          this.close();
        },
        error: (error) => {
          console.error('Error al crear el usuario:', error);
        }
      });
    } else {
      console.log('El formulario no es válido');
    }
  }


  //Acciones para abrir y cerrar el modal
  open(): void {
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
  }
}
