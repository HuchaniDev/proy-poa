import { Component, inject } from "@angular/core";
import { DialogHeaderComponent } from "../../../../../shared/controls/dialog-header/dialog-header.component";
import { InputDirective } from "../../../../../shared/directives/input.directive";
import { DialogService } from "../../../../../shared/controls/dialog";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { finalize } from "rxjs";
import { StrategicAxisService } from "../../../services/strategic-axis/strategic-axis.service";
import { ApiResponseInterface } from "../../../../../core/models/api-response.interface";
import StrategicLineIndexComponent from "../index/strategic-line-index.component";
import { StrategicAxisInterface } from "../../../models/strategic-axis/strategic.interface";
import { StrategicLineService } from "../../../services/strategic-axis/strategic-line.service";
import { StrategicLineInterface } from "../../../models/strategic-axis/strategic-line.interface";

@Component({
  selector: 'app-strategic-axis-form',
  templateUrl: './strategic-line-form.component.html',
  standalone: true,
  imports: [
    DialogHeaderComponent,
    InputDirective,
    ReactiveFormsModule
  ]
})
export default class StrategicLineFormComponent {
  #dialogService = inject(DialogService); 
  #strategicLineService = inject(StrategicLineService);

  strategicLineId: number |null = this.#dialogService.dialogConfig?.data?.strategicLine as number;
  strategicAxisId: number |null = this.#dialogService.dialogConfig?.data?.strategicAxis as number;
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
    console.log('this.formGroup',this.formGroup.value);
    
    if(this.formGroup.valid){
      this.#strategicLineService.save$(this.formGroup.value)
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
      id: new FormControl<number>(0),
      name: new FormControl<string>('',[Validators.required]),
      strategicAxisId: new FormControl<number|null>(this.strategicAxisId,[Validators.required]),
    });
  }

  #loadData(){
    if(this.strategicLineId&& this.strategicLineId>0){
      this.isProcessing = true;

      this.#strategicLineService.getById$(this.strategicLineId)
      .pipe(finalize(()=>this.isProcessing=false))
      .subscribe({
        next: (response: ApiResponseInterface<StrategicLineInterface>) => {
          this.formGroup.setValue(
            {
              id: response.data.id,
              name: response.data.name,
              strategicAxisId: response.data.strategicAxisId
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