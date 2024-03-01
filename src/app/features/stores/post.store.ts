import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { QueryParams } from '../../common/query-params';
import { PostModel } from '../data/post.model';
import { computed, inject } from '@angular/core';
import { PostService } from '../services/post.service';
import {
  debounceTime,
  distinctUntilChanged,
  from,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import { tapResponse } from '@ngrx/operators';

type PostState = {
  posts: PostModel[];
  isLoading: boolean;
  filter: { query: QueryParams };
};

const initialState: PostState = {
  posts: [],
  isLoading: false,
  filter: { query: {} as QueryParams },
};

export const PostStore = signalStore(
  // The initial state of the store
  withState(initialState),
  // Reducers
  withComputed(({ posts, filter }) => ({
    postsCount: computed(() => posts().length),
    sortedPosts: computed(() => {
      const query = filter.query();
      let { orderBy, orderDirection } = query;
      if (!orderBy) return posts;

      if (!orderDirection) orderDirection = 'asc';

      return posts().sort((a, b) => {
        if (orderDirection === 'asc') {
          return a[orderBy as keyof PostModel] > b[orderBy as keyof PostModel]
            ? 1
            : -1;
        } else {
          return a[orderBy as keyof PostModel] < b[orderBy as keyof PostModel]
            ? 1
            : -1;
        }
      });
    }),
  })),
  // Methods
  withMethods((store, postService = inject(PostService)) => ({
    updateQuery(query: QueryParams) {
      patchState(store, { filter: { query: query } });
    },
    async getAll(): Promise<void> {
      patchState(store, (state) => ({ isLoading: true }));
      const posts = await postService.getAll();
      patchState(store, { posts, isLoading: false });
    },
    getAllByQuery: rxMethod<QueryParams>(
      pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query) =>
          from(postService.getAll(query)).pipe(
            tapResponse({
              next: (posts: PostModel[]) => {
                //setup posts to add some dummy image path
                posts.map((post) => {
                  post.imagePath = 'https://picsum.photos/seed/picsum/200/300';
                });

                patchState(store, { posts });
              },
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          )
        )
      )
    ),
  }))
);
