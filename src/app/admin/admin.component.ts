import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @ViewChild(ModalComponent) modal!: ModalComponent; // Referencia al componente Modal

  constructor() { }

  ngOnInit(): void {
  }

  // Abre el modal para añadir un nuevo usuario
  openAddUserModal(): void {
    this.modal.open();
  }

  // Abre el modal para editar un usuario existente
  openEditUserModal(): void {
    this.modal.open();
  }

  
}
