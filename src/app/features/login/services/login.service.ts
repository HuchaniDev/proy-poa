import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { ApiResponseInterface } from "../../../core/models/api-response.interface";
import { UserAuthInterface } from "../models/user-auth.interface";

@Injectable({
  providedIn: 'root'
})
export default class LoginService {
  #http = inject(HttpClient);
  #api='http://localhost:5256/auth';
  
  login$(user:UserAuthInterface){
    return this.#http.post<ApiResponseInterface<string>>(`${this.#api}/login`, user)
    .pipe(
      catchError(this.#handleError)
    );
  }

  #handleError(error: HttpErrorResponse) {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			errorMessage = `Error fontend: ${error.error.message}`;
		} else {
			errorMessage = `Error backend Code: ${error.status}\nMessage: ${JSON.stringify(error.error)}`;
		}
    console.error(errorMessage);
		return throwError(()=> error);
	}
}