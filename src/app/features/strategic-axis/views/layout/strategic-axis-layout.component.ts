import { Component, inject } from "@angular/core";
import { PageHeaderComponent } from "../../../../shared/controls/page-header/page-header.component";
import { InputDirective } from "../../../../shared/directives/input.directive";
import { DialogService } from "../../../../shared/controls/dialog";
import StrategicAxisFormComponent from "../form/strategic-axis-form.component";

@Component({
  selector: 'app-strategic-axis-layout',
  templateUrl: './strategic-axis-layout.component.html',
  standalone: true,
  imports: [
    PageHeaderComponent,
    InputDirective
  ]
})
export default class StrategicAxisLayoutComponent {
  #dialodService=inject(DialogService);
  
  
  
  /**
   *
   */
  constructor() {
    this.openForm();


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
  }
}