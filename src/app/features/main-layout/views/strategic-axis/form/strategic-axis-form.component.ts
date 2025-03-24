import { Component, inject } from "@angular/core";
import { DialogHeaderComponent } from "../../../../../shared/controls/dialog-header/dialog-header.component";
import { InputDirective } from "../../../../../shared/directives/input.directive";
import { DialogService } from "../../../../../shared/controls/dialog";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { finalize } from "rxjs";
import { StrategicAxisService } from "../../../services/strategic-axis/strategic-axis.service";
import { ApiResponseInterface } from "../../../../../core/models/api-response.interface";
import { StrategicAxisInterface } from "../../../models/strategic-axis/strategic.interface";
import { ToastService } from "../../../../../shared/controls/toast-alert/toast.service";

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
  #toastService = inject(ToastService);

  strategicAxisId: number |null = this.#dialogService.dialogConfig?.data?.strategicAxisId;
  isProcessing = false;
  message = '';

  formGroup!:FormGroup;

  constructor() {
    this.#initializeComponent();    
    this.#loadData();
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
            this.strategicAxisId!>0
            ?this.#toastService.showToast('Actualizado correctamente','update',5000)
            :this.#toastService.showToast(response.message,'success',5000)
            this.message = 'Guardado con exito';
            this.close(true);
          }
        },
        error: (error) => {
          this.message = error.error.errors;
          this.#toastService.showToast(error.error.errors.join(","),'error',5000);

        }
      })
    }
  }

  #initializeComponent(){
    this.formGroup = new FormGroup({
      id: new FormControl<number|null>(this.strategicAxisId),
      code: new FormControl<number|null>(null,[Validators.required,Validators.pattern("^[0-9]*$") ]),
      description: new FormControl<string>('',[Validators.required]),
    });
  }

  #loadData(){
    if(this.strategicAxisId&& this.strategicAxisId>0){
      this.isProcessing = true;

      this.#strategyAxisService.getById$(this.strategicAxisId)
      .pipe(finalize(()=>this.isProcessing=false))
      .subscribe({
        next: (response: ApiResponseInterface<StrategicAxisInterface>) => {
          this.formGroup.setValue(
            {
              id: response.data.id,
              code: response.data.code,
              description: response.data.description
            }
          );
        },
        error: (error) => {
          this.message = error.error.errors;
          console.log('error',error);
          this.close(false);
        }
      });
    }
  }
}