import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { PageHeaderComponent } from "../../../../../shared/controls/page-header/page-header.component";
import { DialogService } from "../../../../../shared/controls/dialog/dialog.service";
import StrategicLineFormComponent from "../Form/strategic-line-form.component";

@Component({
    selector:'app-strategic-line',
    templateUrl:'./strategic-line-index.component.html',
    standalone:true,
    imports: [PageHeaderComponent]
})
export default class StrategicLineComponent{
	#router = inject(Router);
	#dialog = inject(DialogService);

	strateAxisId:number | null = null;

	constructor() {
		this.strateAxisId = history.state;

		if(this.strateAxisId && history.state.navigationId){

		}
			
	}

	returnToAxis(){
		this.#router.navigate(['strategic-axis']);
	}
	openForm(strategicLineId:number=0){
		this.#dialog.open(StrategicLineFormComponent,{
			size:{
        width: '800px',
        minWidth: '350px',
        maxWidth: '95%',
        height: 'auto',
        maxHeight: '80%'
      },
      data:{
				strategicLine:strategicLineId,
				strategicAxis:this.strateAxisId
			}
		});
	}
}