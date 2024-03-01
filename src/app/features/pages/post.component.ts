import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { PostStore } from '../stores/post.store';
import { CardComponent } from '../components/card.component';
import { SearchComponent } from '../components/search.component';

@Component({
  selector: 'app-post',
  template: `
    <h1>Post ({{ store.postsCount() }})</h1>

    <div class="container">
      <p>{{ store.isLoading() ? 'Loading...' : '' }}</p>
      <app-search (queryChange)="store.updateQuery($event)" />
      @for (post of store.posts(); track $index) {

      <app-card [post]="post" />

      }
    </div>
  `,
  standalone: true,
  providers: [PostStore],
  imports: [CardComponent, SearchComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        .container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
        }
      }
    `,
  ],
})
export class PostComponent implements OnInit {
  readonly store = inject(PostStore);

  ngOnInit(): void {
    const query = this.store.filter.query;
    // 👇 Re-fetch posts whenever the value of query signal changes.
    this.store.getAllByQuery(query);
  }
}
