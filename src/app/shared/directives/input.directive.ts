import { Directive, HostBinding, Input } from "@angular/core";

@Directive({
  selector: '[app-input]',
  standalone: true,
  host: {
    class: 'w-full h-10 p-2 bg-white border border-gray-300 rounded-md text-[18px] shadow-inner outline-none placeholder-gray-400 focus:border-blue-400 transition duration-300'
  }
})
export class InputDirective {}
