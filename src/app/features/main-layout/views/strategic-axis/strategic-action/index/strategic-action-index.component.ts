import { Component, effect, input, inject } from "@angular/core";
import { StrategicActionService } from "../../../../services/strategic-axis/strategic-action.service";
import { StrategicAction } from "../../../../models/strategic-axis/strategic-actions.interface";
import { ApiResponseInterface } from "../../../../../../core/models/api-response.interface";
import { DialogService } from "../../../../../../shared/controls/dialog";
import { StrategicActionFormComponent } from "../form/strategic-action-form.component";
import { finalize } from "rxjs";

@Component({
    selector:'app-strategic-action',
    templateUrl:'./strategic-action-index.component.html',
    standalone:true,
    imports: []
})
export class StrategicActionComponent{
  #dialogService = inject(DialogService);
  #strategicActionService = inject(StrategicActionService);

  strategicLineId = input.required<number>();
  isLoading = false;
  strategocactions:StrategicAction[] = [];

  constructor() {

    effect(() => {
      //console.log('Nuevo ID detectado:', this.strategicLineId());
      this.getStrategicAction();
    });
  }

  openForm(strategicActionId:number=0){
    this.#dialogService.open(StrategicActionFormComponent,{
      size:{
        width: '800px',
        minWidth: '350px',
        maxWidth: '95%',
        height: 'auto',
        maxHeight: '80%'
      },
      data:{
        strategicLine: this.strategicLineId(),
        strategicAction: strategicActionId
      }
    })
    .afterClosed()
    .subscribe({
      next: (response) => {
        if(response){
          this.getStrategicAction();
        }
      },
      error: (error) => {
        console.log('Error al cerrar el formulario:', error);
      }
    });
  }
  
  getStrategicAction() {
    this.isLoading = true;
    // console.log('Obteniendo líneas de acción para ID:', this.strategicLineId());
    this.#strategicActionService.getStrategicActionByLineId$(this.strategicLineId())
    .subscribe({
      next: (response:ApiResponseInterface<StrategicAction[]>) => {
        this.strategocactions = response.data;
      },
      error: (error) => {
        console.log('Error al obtener líneas de acción:', error);
      }
    });
  }

  delete(strategicActionId:number){
    this.isLoading = true;
    this.#strategicActionService.delete$(strategicActionId)
    .pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe({
      next: (response) => {
        this.getStrategicAction();
      },
      error: (error) => {
        console.log('Error al eliminar:', error);
      }
    });
  }
}