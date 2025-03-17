import { Component, inject } from "@angular/core";
import { DialogHeaderComponent } from "../../../../../shared/controls/dialog-header/dialog-header.component";
import { InputDirective } from "../../../../../shared/directives/input.directive";
import { DialogService } from "../../../../../shared/controls/dialog";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { finalize } from "rxjs";
import { StrategicAxisService } from "../../../services/strategic-axis/strategic-axis.service";
import { ApiResponseInterface } from "../../../../../core/models/api-response.interface";
import StrategicAxisIndexComponent from "../index/strategic-axis-index.component";
import { StrategicAxisInterface } from "../../../models/strategic-axis/strategic.interface";

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
  #dialogService = inject(DialogService); // DialogService
  #strategyAxisService = inject(StrategicAxisService);

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