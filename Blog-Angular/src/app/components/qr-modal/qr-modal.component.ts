import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-qr-modal',
  templateUrl: './qr-modal.component.html',
  styleUrls: ['./qr-modal.component.css']
})
export class QrModalComponent {
  @Input() isVisible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  //Fechar se apertar esc ou clicar fora
  handleEscapeKey(event: KeyboardEvent) {
    if (this.isVisible) {
      this.closeModal.emit();
    }
  }
  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal.emit();
    }
  }
}
