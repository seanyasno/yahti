import { Activity, UserDetails } from '@abstraction/index';
import { addDoc, collection, getDoc, doc } from '@firebase/firestore';
import { db } from '@config/index';
import { userConverter } from '@utils/firebase';

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
