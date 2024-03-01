import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { PostModel } from '../data/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  readonly firestore = inject(Firestore);
  readonly dbPath: string = 'posts';

  async getAll(inputQuery?: any): Promise<PostModel[]> {
    const docRef: CollectionReference<DocumentData, DocumentData> = collection(
      this.firestore,
      this.dbPath
    );

    let queryRef;
    if (inputQuery) {
      // Start with the base query
      queryRef = query(docRef);

      // If there's a field query, add it
      if (inputQuery.field && inputQuery.operator && inputQuery.value) {
        queryRef = query(
          queryRef,
          where(inputQuery.field, inputQuery.operator, inputQuery.value)
        );
      }

      // If there's a sort query, add it
      if (inputQuery.sortField && inputQuery.sortDirection) {
        queryRef = query(
          queryRef,
          orderBy(inputQuery.sortField, inputQuery.sortDirection)
        );
      }
    } else {
      // If no inputQuery is provided, just query the collection
      queryRef = query(docRef);
    }

    const querySnapshot = await getDocs(queryRef);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    }) as PostModel[];
  }
}
