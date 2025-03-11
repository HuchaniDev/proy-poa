import { Component, inject } from "@angular/core";
import { DialogHeaderComponent } from "../../../../shared/controls/dialog-header/dialog-header.component";
import { InputDirective } from "../../../../shared/directives/input.directive";
import { DialogService } from "../../../../shared/controls/dialog";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { StrategicAxisService } from "../../services/strategic-axis.service";
import { finalize } from "rxjs";

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
  #strategyAxisService = inject(StrategicAxisService);

  strategicAxisId: number |null = this.#dialogService.dialogConfig?.data?.strategicAxisId;
  isProcessing = false;
  message = '';

  formGroup!:FormGroup;

  constructor() {
    this.#initializeComponent();    
  }

  close(value:boolean){
    this.#dialogService.close(value);
  }
  save(){
    this.isProcessing = true;
    this.message = 'guardando...';
    if(this.formGroup.valid){
      this.#strategyAxisService.save$(this.formGroup.value)
      .pipe(
        finalize(() => {
          this.isProcessing = false;
        })
      )
      .subscribe({
        next: (response) => {
          if(response.isSuccess){
            this.message = 'Guardado con exito';
            this.close(true);
          }
        },
        error: (error) => {
          this.message = error.error.errors;
        }
      })
    }
  }

  #initializeComponent(){
    this.formGroup = new FormGroup({
      id: new FormControl<number|null>(this.strategicAxisId),
      code: new FormControl<string>('',[Validators.required]),
      description: new FormControl<string>('',[Validators.required]),
    });
  }
}