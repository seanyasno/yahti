import { DocumentData, FirestoreDataConverter } from '@firebase/firestore';

import { UserDetails } from '@abstraction/types';

export const userConverter: FirestoreDataConverter<UserDetails> = {
    toFirestore: (user: UserDetails) => user,
    fromFirestore: (snapshot: DocumentData) => snapshot.data() as UserDetails,
};
