import { Directive } from "@angular/core";

@Directive({
  selector: '[app-input]',
  standalone: true,
  host: {
    class: 'w-full h-10 p-2 pl-10 bg-white border border-gray-300 rounded-md text-sm shadow-inner outline-none placeholder-gray-400 focus:border-blue-400 transition duration-300'
  }
})
export class InputDirective {}