import { Component, inject } from "@angular/core";
import { DialogHeaderComponent } from "../../../../shared/controls/dialog-header/dialog-header.component";
import { InputDirective } from "../../../../shared/directives/input.directive";
import { DialogService } from "../../../../shared/controls/dialog";

@Component({
  selector: 'app-strategic-axis-form',
  templateUrl: './strategic-axis-form.component.html',
  standalone: true,
  imports: [
    DialogHeaderComponent,
    InputDirective
  ]
})
export default class StrategicAxisFormComponent {
  #dialogService = inject(DialogService);

  strategicAxisId: number |null = this.#dialogService.dialogConfig?.data?.strategicAxisId;
}