import { Component, inject } from "@angular/core";
import { PageHeaderComponent } from "../../../../../shared/controls/page-header/page-header.component";
import { InputDirective } from "../../../../../shared/directives/input.directive";
import { DialogService } from "../../../../../shared/controls/dialog";
import StrategicAxisFormComponent from "../form/strategic-axis-form.component";
import { finalize, of, switchMap } from "rxjs";
import { ApiResponseInterface } from "../../../../../core/models/api-response.interface";
import { FormsModule } from "@angular/forms";
import { StrategicAxisService } from "../../../services/strategic-axis/strategic-axis.service";
import { StrategicAxisInterface } from "../../../models/strategic-axis/strategic.interface";

@Component({
  selector: 'app-strategic-axis-layout',
  templateUrl: './strategic-axis-index.component.html',
  standalone: true,
  imports: [
    PageHeaderComponent,
    InputDirective,
    FormsModule,

  ]
})
export default class StrategicAxisIndexComponent {
  #dialodService=inject(DialogService);
  #strategicAxisService=inject(StrategicAxisService);
  
  isLoaging = false;
  strategicAxisList: StrategicAxisInterface[] = [];

  textSearch = '';
  
  
  /**
   *
   */
  constructor() {
    this.isLoaging = true;
    this.#loadData$().pipe(finalize(()=>this.isLoaging=false))
    .subscribe({
      next: (value:ApiResponseInterface<StrategicAxisInterface[]>) => {
        this.strategicAxisList = value.data;
      },
      error: (error) => {
        console.log('error',error);
      }
    });
  }

  searchByDescription(){
    if(this.textSearch){
      this.isLoaging = true;
      this.#strategicAxisService.getByDescription$(this.textSearch).pipe(
        finalize(()=>this.isLoaging=false)
      )
      .subscribe({
        next: (value:ApiResponseInterface<StrategicAxisInterface[]>) => {
          this.strategicAxisList = value.data;
        },
        error: (error) => {
          console.log('error',error);
          this.textSearch = '';
        }
      });
    }

  }

  openForm(strategicAxisId:number=0) {
    console.log('openForm',strategicAxisId);
    
    this.#dialodService.open(StrategicAxisFormComponent,{
      size:{
        width: '800px',
        minWidth: '350px',
        maxWidth: '95%',
        height: 'auto',
        maxHeight: '80%'
      },
      data:{strategicAxisId:strategicAxisId}
    })
    .afterClosed()
    .pipe(
        switchMap((response:boolean)=>{
          if(response){
            return this.#loadData$();
          }
          else{
            return of({data: this.strategicAxisList} as ApiResponseInterface<StrategicAxisInterface[]>);
          }
        })
    )
    .subscribe({
      next: (value:ApiResponseInterface<StrategicAxisInterface[]>) => {
        this.strategicAxisList = value.data;
      }
    })
  }

  delete(axisId:number){
    console.log('delete');
    this.isLoaging = true;
    this.#strategicAxisService.delete$(axisId).pipe(
      switchMap(()=>this.#loadData$()),
      finalize(()=>this.isLoaging=false)
    )
    .subscribe({
      next: (value:ApiResponseInterface<StrategicAxisInterface[]>) => {
        this.strategicAxisList = value.data;
      },
      error: (error) => {
        console.log('error',error);
      }
    });
      
  }

  edit(axisId:number){
    this.openForm(axisId);
  }

  #loadData$(){
    return this.#strategicAxisService.getAll$().pipe(finalize(()=>{
      console.log('finalizo');
    }))
  }
}