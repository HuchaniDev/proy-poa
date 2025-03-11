import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  standalone: true,
  imports: []
})
export class PageHeaderComponent {
 @Input() title = '';
 @Input() description = '';

}
