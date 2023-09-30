import { DocumentData, FirestoreDataConverter } from '@firebase/firestore';

import { Comment, UserDetails } from '@abstraction/types';

export const userConverter: FirestoreDataConverter<UserDetails> = {
  toFirestore: (user: UserDetails) => user,
  fromFirestore: (snapshot: DocumentData) => snapshot.data() as UserDetails,
};

export const commentConverter: FirestoreDataConverter<Comment> = {
  toFirestore: (comment: Comment) => comment,
  fromFirestore: (snapshot: DocumentData) =>
    ({
      ...snapshot.data(),
      createdAt: snapshot.data().createdAt.toDate(),
    } as Comment),
};
