import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  isVisible: boolean = false; // Controla la visibilidad del modal

  constructor() { }

  ngOnInit(): void { }

  // Método para abrir el modal
  open(): void {
    this.isVisible = true;
  }

  // Método para cerrar el modal
  close(): void {
    this.isVisible = false;
  }
}
