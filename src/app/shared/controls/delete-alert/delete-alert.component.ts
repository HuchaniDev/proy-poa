import { Component, inject } from "@angular/core";
import { DialogService } from "../dialog";

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  standalone: true
})
export class DeleteAlertComponent {
  #dialogService = inject(DialogService);

  title:string = this.#dialogService.dialogConfig?.data?.title || 'Estas seguro?';
  message:string =this.#dialogService.dialogConfig?.data.message|| 'Se borrará de forma permanente';
 
  close(value:boolean){
    this.#dialogService.close(value);
  }
}