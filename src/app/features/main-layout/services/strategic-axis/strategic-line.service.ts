import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { StrategicLineInterface } from "../../models/strategic-axis/strategic-line.interface";
import { ApiResponseInterface } from "../../../../core/models/api-response.interface";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class StrategicLineService {
 #httpClient = inject(HttpClient);
#endpoint="http://localhost:5256/strategic-line";

save$(strategicLine:StrategicLineInterface){
  return this.#httpClient.post<ApiResponseInterface<object>>(`${this.#endpoint}/`,strategicLine)
  .pipe(
    catchError((error) => {
      return this.#handleError(error);
    }
  ));
}

getAll$(strategicAxisId:number){
  return this.#httpClient.get<ApiResponseInterface<StrategicLineInterface[]>>(`${this.#endpoint}/strategic-axis-id/${strategicAxisId}`)
  .pipe(
    catchError((error) => {
      return this.#handleError(error);
    }
  ));

}

getById$(strategicLineId:number){
  return this.#httpClient.get<ApiResponseInterface<StrategicLineInterface>>(`${this.#endpoint}/${strategicLineId}`)
  .pipe(
    catchError((error) => {
      return this.#handleError(error);
    }
  ));
}

delete$(strategicLineId:number){
  return this.#httpClient.delete<ApiResponseInterface<object>>(`${this.#endpoint}/${strategicLineId}`)
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