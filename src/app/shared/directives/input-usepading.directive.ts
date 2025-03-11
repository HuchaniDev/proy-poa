import { Directive } from "@angular/core";

@Directive({
  selector: '[app-input-padding]',
  standalone: true,
  host: {
    class: 'w-full h-10 p-2 pl-10 bg-white border border-gray-300 rounded-md text-xl shadow-inner outline-none placeholder-gray-400 focus:border-blue-400 transition duration-300'
  }
})
export class InputDirectivePadding {}