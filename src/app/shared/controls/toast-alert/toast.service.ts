import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

interface Toast {
  message: string;
  type: 'success' | 'error' | 'info' | 'delete' | 'update';
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastMessage = signal<Toast | null>(null);

  get toastMessage$() {
    return this.toastMessage;
  }

  showToast(message: string, type: 'success' | 'error' | 'info' | 'delete' | 'update', duration: number = 5000) {
    // Crear el nuevo toast y configurarlo
    this.toastMessage.set({ message, type, duration });

    // Reset después del tiempo de duración
    setTimeout(() => {
      this.toastMessage.set(null);
    }, duration);
  }
}
