import { Component, inject } from "@angular/core";
import { DialogService } from "../../../../../../shared/controls/dialog";
import { StrategicActionService } from "../../../../services/strategic-axis/strategic-action.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { DialogHeaderComponent } from "../../../../../../shared/controls/dialog-header/dialog-header.component";
import { InputDirective } from "../../../../../../shared/directives/input.directive";
import { finalize } from "rxjs";

@Component({
    selector:'app-strategic-action-form',
    templateUrl:'./strategic-action-form.component.html',
    standalone:true,
    imports: [
      DialogHeaderComponent,
      ReactiveFormsModule,
      InputDirective
    ]
})
export class StrategicActionFormComponent{
  #dialogService = inject(DialogService);
  #strategicActionService = inject(StrategicActionService);
  
  strategicActionId: number |null = this.#dialogService.dialogConfig?.data?.strategicAction as number;
  strategicLineId: number |null = this.#dialogService.dialogConfig?.data?.strategicLine as number;
  isProcessing = false;

  formGroup!:FormGroup;
  
  constructor() {
    this.#initializeComponent();
    this.#loadData();
  }

  close(value:boolean){
    this.#dialogService.close(value);
  }

  save(){
    console.log(this.formGroup.value);
    this.isProcessing = true;
    this.#strategicActionService.save$(this.formGroup.value)
    .pipe(
      finalize(() => {  
        this.isProcessing = false;
      })
    )
    .subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.close(true);
        }
      },
      error: (error) => {
        console.log('Error al guardar:', error);
      }
    });

  }

  #initializeComponent(){
    this.formGroup = new FormGroup({
      id:new FormControl<number|null>(this.strategicActionId),
      strategicLineId:new FormControl<number|null>(this.strategicLineId,[Validators.required]),
      name:new FormControl<string>('',[Validators.required]),
    });
  }

  #loadData(){
    if(this.strategicActionId&& this.strategicActionId>0){
      this.isProcessing = true;
      this.#strategicActionService.getById$(this.strategicActionId)
      .pipe(
        finalize(() => {
          this.isProcessing = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.formGroup.patchValue(response.data);
        },
        error: (error) => {
          console.log('Error al cargar datos:', error);
          this.close(false);
        }
      });
    }
  }
}