import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class  StrategicAxisService{
  #httpClient = inject(HttpClient);
  #endpoint="";

  getAll$(){
    return this.#httpClient.get(`${this.#endpoint}/`)
    .pipe(
      catchError((error) => {
        return this.#handleError(error);
      }
    ));
  }

  getById$(strategicAxisId:number){
    return this.#httpClient.get(`${this.#endpoint}/by-id/${strategicAxisId}`)
    .pipe(
      catchError((error) => {
        return this.#handleError(error);
      }
    ));
  }

  save$(strategicAxis:any){
    return this.#httpClient.post(`${this.#endpoint}`,strategicAxis)
    .pipe(
      catchError((error) => {
        return this.#handleError(error);
      }
    ));
  }

  delete$(strategicAxisId:number){
    return this.#httpClient.delete(`/${strategicAxisId}`)
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