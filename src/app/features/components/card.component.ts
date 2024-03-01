import { Component, model } from '@angular/core';
import { PostModel } from '../data/post.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <img
        [ngSrc]="post().imagePath"
        width="600"
        height="300"
        class="card-img-top"
        alt="..."
        priority
      />
      <div class="card-body">
        <h3 class="card-title">{{ post().title }}</h3>
        <p class="card-text">{{ post().content }}</p>
      </div>
    </div>
  `,
  standalone: true,
  imports: [NgOptimizedImage],
  styles: [
    `
      :host {
        .card {
          width: 100%;
          border-radius: 0.5rem;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
        }

        .card-img-top {
          object-fit: cover;
          max-width: 100%;
        }

        .card-body {
          padding: 0.5rem;
        }

        .card-title {
          margin-bottom: 0.5rem;
          text-align: left;
          padding: 0;
          margin: 0;
        }

        .card-text {
          margin-bottom: 1rem;
          text-align: left;
        }
      }
    `,
  ],
})
export class CardComponent {
  post = model.required<PostModel>();
}
