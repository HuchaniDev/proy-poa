import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { PageHeaderComponent } from "../../../../../shared/controls/page-header/page-header.component";
import { DialogService } from "../../../../../shared/controls/dialog/dialog.service";
import StrategicLineFormComponent from "../Form/strategic-line-form.component";
import { StrategicAxisInterface } from "../../../models/strategic-axis/strategic.interface";
import { StrategicLineService } from "../../../services/strategic-axis/strategic-line.service";
import { StrategicLineInterface } from "../../../models/strategic-axis/strategic-line.interface";
import { finalize } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
    selector:'app-strategic-line',
    templateUrl:'./strategic-line-index.component.html',
    standalone:true,
    imports: [
			PageHeaderComponent,
			CommonModule,
			
		]
})
export default class StrategicLineComponent{
	#router = inject(Router);
	#dialog = inject(DialogService);
	#strategicLineService = inject(StrategicLineService);

	strategicAxis:StrategicAxisInterface | null = null;
	strategicLines:StrategicLineInterface[] = [];

	isLoading = false;
	strategicLineIdSelected:number = 0;

	constructor() {
		this.strategicAxis = history.state;
		console.log('this.strateAxisId',this.strategicAxis);
		this.getByAxisId();


		// if(this.strateAxisId && history.state.navigationId){

		// }
			
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
				strategicAxis:this.strategicAxis?.id
			}
		}).afterClosed()
		.subscribe({
			next:(response) => {
				if(response){
					this.getByAxisId();
				}
			},
			error:(error) => {
				console.log('error',error);
			}
		})
	}

	getByAxisId(){
		if(this.strategicAxis!=null && this.strategicAxis.id !== 0){

			this.#strategicLineService.getAll$(this.strategicAxis.id)
			.subscribe({
				next:(response) => {
					console.log('response',response);
					this.strategicLines = response.data;
				},
				error:(error) => {
					console.log('error',error);
				}
			});
		}	
	}

	delete(strategicLineId:number){
		this.isLoading = true;
		this.#strategicLineService.delete$(strategicLineId)
		.pipe(
			finalize(() => {
				this.isLoading = false;
			}		
		))
		.subscribe({
			next:(response) => {
				console.log('response',response);
				this.getByAxisId();
			},
			error:(error) => {
				console.log('error',error);
			}
		});
	}


	viewActions(strategicLineId:number){
		this.strategicLineIdSelected = strategicLineId;
	}
}