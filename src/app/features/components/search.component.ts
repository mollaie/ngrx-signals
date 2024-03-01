import { Component, EventEmitter, Output } from '@angular/core';
import { QueryParams } from '../../common/query-params';

@Component({
  selector: 'app-search',
  template: `
    <div class="search">
      <input type="text" placeholder="Search" (input)="onValueChange($event)" />
    </div>
  `,
  standalone: true,
  styles: [
    `
      :host {
        .search {
          display: flex;
          gap: 1rem;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 0.5rem;

          input {
            width: 100%;
            padding: 0.5rem;
            border: none;
            outline: none;
          }
        }
      }
    `,
  ],
})
export class SearchComponent {
  @Output() queryChange = new EventEmitter<QueryParams>();

  onValueChange(value: Event) {
    this.queryChange.emit({
      field: 'title',
      value: (value.target as HTMLInputElement).value,
      operator: '==',
    });
  }
}
