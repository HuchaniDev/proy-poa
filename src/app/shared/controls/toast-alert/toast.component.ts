import { Component, inject, signal, effect } from '@angular/core';
import { ToastService } from './toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  imports: [
    CommonModule
  ],
  styles: [`
    .toast{
      z-index: 1500;
    }
  `]
})
export class ToastComponent {
  message = signal('');
  type = signal<'success' | 'error' | 'info' | 'delete' | 'update'>('info');
  duration = signal(5000); // Default 5 seconds
  isVisible = signal(false);

  private toastService = inject(ToastService);

  constructor() {
    effect(
      () => {
        const toast = this.toastService.toastMessage$();
        if (toast) {
          // Cambiar valores de señales
          this.message.set(toast.message);
          this.type.set(toast.type);
          this.duration.set(toast.duration);
          this.isVisible.set(true);

          // Cerrar después de un tiempo
          setTimeout(() => this.closeToast(), toast.duration);
        } else {
          this.isVisible.set(false);
        }
      },
      { allowSignalWrites: true }
    );
  }

  closeToast() {
    this.isVisible.set(false);
  }

  // toastTypeClass() {
  //   switch (this.type()) {
  //     case 'success': return 'success';
  //     case 'error': return 'error';
  //     case 'info': return 'info';
  //     case 'delete': return 'delete';
  //     case 'update': return 'update';
  //     default: return '';
  //   }
  // }
}
