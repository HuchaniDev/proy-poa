import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { PageHeaderComponent } from "../../../../../shared/controls/page-header/page-header.component";

@Component({
    selector:'app-strategic-line',
    templateUrl:'./strategic-line-index.component.html',
    standalone:true,
    imports: [PageHeaderComponent]
})
export default class StrategicLineComponent{
	#router = inject(Router);

	strateAxisId:number | null = null;

	constructor() {
		this.strateAxisId = history.state;

		if(this.strateAxisId && history.state.navigationId){

		}
			
	}

	returnToAxis(){
		this.#router.navigate(['strategic-axis']);
	}
}