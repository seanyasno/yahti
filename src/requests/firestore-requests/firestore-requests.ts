import { Activity, UserDetails } from '@abstraction/index';
import {
    addDoc,
    collection,
    getDoc,
    doc,
    setDoc,
    deleteDoc,
    getDocs,
} from '@firebase/firestore';
import { db } from '@config/index';
import { userConverter } from '@utils/firebase';

export const fetchActivities = async (): Promise<
    { activity: Activity; id: string }[]
> => {
    try {
        const querySnapshot = await getDocs(collection(db, 'activities'));
        return querySnapshot.docs.map((doc) => ({
            activity: doc.data(),
            id: doc.id,
        })) as { activity: Activity; id: string }[];
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const fetchActivityById = async (id: string): Promise<Activity> => {
    try {
        const docRef = doc(db, 'activities', id);
        const docSnap = await getDoc(docRef);
        return docSnap.data() as Activity;
    } catch (error) {
        console.error(error);
        return {} as Activity;
    }
};

export const createActivity = async (newActivity: Activity) => {
    try {
        return await addDoc(collection(db, 'activities'), newActivity);
    } catch (error) {
        console.error(error);
    }
};

export const fetchUserDetailsByEmail = async (
    email: string
): Promise<UserDetails> => {
    try {
        const user = await getDoc<UserDetails>(
            doc(db, 'users', email).withConverter(userConverter)
        );
        return user.data();
    } catch (error) {
        console.error(error);
    }
};

export const updateActivity = async (
    id: string,
    newActivityData: Partial<Activity>
) => {
    try {
        await setDoc(doc(db, 'activities', id), newActivityData, {
            merge: true,
        });
    } catch (error) {
        console.error(error);
    }
};

export const deleteActivity = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'activities', id));
    } catch (error) {
        console.error(error);
    }
};
