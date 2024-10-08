import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { ModalComponent } from '../modal/modal.component'; // Importa el modal

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  showErrorModal: boolean = false; // Control para el modal
  @ViewChild('registerModal') registerModal!: ModalComponent; // Referencia al modal

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(event: Event): void {
    event.preventDefault();

    if (!this.loginForm.valid) {
      this.errorMessage = "Please provide valid credentials.";
      this.showErrorModal = true; // Mostrar el modal si el formulario es inválido
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        alert('User login succesfully.');
        this.router.navigate(['/admin']);
      },
      error: (error: string) => {
        // Mostrar el modal si ocurre un error en el login
        this.errorMessage = "Invalid login credentials.";
        this.showErrorModal = true;
        console.error("Login failed", error);
      }
    });
  }

  // Método para abrir el modal de registro
  openRegisterModal() {
    this.registerModal.open();
  }

  // Método para cerrar el modal
  closeErrorModal() {
    this.showErrorModal = false;
  }

  // Método para manejar la inscripción del usuario
  handleUserRegistration(event: any) {
    // Puedes manejar la lógica después de crear el usuario aquí
    alert("User registered succesfully.")
    console.log('Usuario registrado:', event);
  }
}
