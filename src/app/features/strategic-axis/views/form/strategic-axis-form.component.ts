import { Component, inject } from "@angular/core";
import { DialogHeaderComponent } from "../../../../shared/controls/dialog-header/dialog-header.component";
import { InputDirective } from "../../../../shared/directives/input.directive";
import { DialogService } from "../../../../shared/controls/dialog";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-strategic-axis-form',
  templateUrl: './strategic-axis-form.component.html',
  standalone: true,
  imports: [
    DialogHeaderComponent,
    InputDirective,
    ReactiveFormsModule
  ]
})
export default class StrategicAxisFormComponent {
  #dialogService = inject(DialogService);

  strategicAxisId: number |null = this.#dialogService.dialogConfig?.data?.strategicAxisId;
  isProcessing = false;
  message = '';

  formGroup!:FormGroup;

  constructor() {
    this.#initializeComponent();    
  }

  close(){
    this.#dialogService.close();
  }
  save(){
    this.isProcessing = true;
    this.message = 'guardando...';
    
  }

  #initializeComponent(){
    this.formGroup = new FormGroup({
      id: new FormControl<number|null>(this.strategicAxisId),
      code: new FormControl<string>('',[Validators.required]),
      description: new FormControl<string>('',[Validators.required]),
    });
  }
}