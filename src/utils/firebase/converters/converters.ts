import { UserDetails } from '@abstraction/types';
import { DocumentData, FirestoreDataConverter } from '@firebase/firestore';

export const userConverter: FirestoreDataConverter<UserDetails> = {
    toFirestore: (user: UserDetails) => user,
    fromFirestore: (snapshot: DocumentData) => snapshot.data() as UserDetails,
};
