import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { ApiResponseInterface } from "../../../../core/models/api-response.interface";
import { StrategicAction } from "../../models/strategic-axis/strategic-actions.interface";

@Injectable({
  providedIn: 'root'
})
export class StrategicActionService {
  #httpClient = inject(HttpClient);
  #endpoint="http://localhost:5256/strategic-action";

  getStrategicActionByLineId$(strategicLineId:number){
    return this.#httpClient.get<ApiResponseInterface<StrategicAction[]>>(`${this.#endpoint}/strategic-line-id/${strategicLineId}`)
    .pipe(
      catchError((error) => {
        return this.#handleError(error);
      }
    ));
  }

  getById$(id:number){
    return this.#httpClient.get<ApiResponseInterface<StrategicAction>>(`${this.#endpoint}/${id}`)
    .pipe(
      catchError((error) => {
        return this.#handleError(error);
      }
    ));
  }

  save$(strategicAction:StrategicAction){
    return this.#httpClient.post<ApiResponseInterface<object>>(`${this.#endpoint}`,strategicAction)
    .pipe(
      catchError((error) => {
        return this.#handleError(error);
      }
    ));
  }

  delete$(id:number){
    return this.#httpClient.delete<ApiResponseInterface<object>>(`${this.#endpoint}/${id}`)
    .pipe(
      catchError((error) => {
        return this.#handleError(error);  
      }
    ));
  }

  #handleError(error: HttpErrorResponse) {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			errorMessage = `Error fontend: ${error.error.message}`;
		} else {
			errorMessage = `Error backend Code: ${error.status}\nMessage: ${JSON.stringify(error.error)}`;
		}
    console.log(errorMessage);
    
		return throwError(()=> error);
	}
}