import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { StrategicAxisInterface } from "../../models/strategic-axis/strategic.interface";
import { ApiResponseInterface } from "../../../../core/models/api-response.interface";

@Injectable({
  providedIn: 'root'
})
export class  StrategicAxisService{
  #httpClient = inject(HttpClient);
  #endpoint="http://localhost:5256/strategic-axis";

  getAll$(){
    return this.#httpClient.get<ApiResponseInterface<StrategicAxisInterface[]>>(`${this.#endpoint}/`)
    .pipe(
      catchError((error) => {
        return this.#handleError(error);
      }
    ));
  }

  getById$(strategicAxisId:number){
    return this.#httpClient.get<ApiResponseInterface<StrategicAxisInterface>>(`${this.#endpoint}/${strategicAxisId}`)
    .pipe(
      catchError((error) => {
        return this.#handleError(error);
      }
    ));
  }

  getByDescription$(description:string){
    return this.#httpClient.get<ApiResponseInterface<StrategicAxisInterface[]>>(`${this.#endpoint}/by-description/${description}`)
    .pipe(
      catchError((error) => {
        return this.#handleError(error);
      }
    ));
  }

  save$(strategicAxis:StrategicAxisInterface){
    return this.#httpClient.post<ApiResponseInterface<object>>(`${this.#endpoint}/`,strategicAxis)
    .pipe(
      catchError((error) => {
        return this.#handleError(error);
      }
    ));
  }

  delete$(strategicAxisId:number){
    return this.#httpClient.delete(`${this.#endpoint}/${strategicAxisId}`)
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