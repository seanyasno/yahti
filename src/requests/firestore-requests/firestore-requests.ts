import { Activity } from '@abstraction/index';
import { addDoc, collection } from '@firebase/firestore';
import { db } from '@config/index';

export const createActivity = async (newActivity: Activity) => {
    try {
        return await addDoc(collection(db, 'activities'), newActivity);
    } catch (error) {
        console.error(error);
    }
};
