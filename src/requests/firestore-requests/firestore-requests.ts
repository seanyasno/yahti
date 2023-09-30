import { db, storage } from '@config/index';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from '@firebase/firestore';
import { listAll, ListResult, ref } from '@firebase/storage';

import { Activity, Comment, UserDetails } from '@abstraction/index';
import { Mood } from '@abstraction/types';
import { commentConverter, userConverter } from '@utils/firebase';

export const fetchMoods = async (): Promise<Mood[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'moods'));
    return querySnapshot.docs.map((doc) => doc.data()) as Mood[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

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

export const fetchImagesByActivityId = async (
  id: string
): Promise<ListResult> => {
  return listAll(ref(storage, `activities/${id}`));
};

export const createActivity = async (newActivity: Activity) => {
  try {
    return addDoc(collection(db, 'activities'), newActivity);
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

export const fetchCommentsByActivityId = async (
  activityId: string
): Promise<Comment[]> => {
  try {
    const querySnapshot = await getDocs(
      collection(db, 'activities', activityId, 'comments').withConverter(
        commentConverter
      )
    );
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createComment = async (
  comment: Comment,
  activityId: string
): Promise<Comment> => {
  try {
    const createdCommentReference = await addDoc(
      collection(db, 'activities', activityId, 'comments').withConverter(
        commentConverter
      ),
      comment
    );
    const createdComment = await getDoc(createdCommentReference);
    return createdComment.data();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const saveDeviceToken = async (email: string, token: string) => {
  try {
    if (!email || !token) {
      return;
    }

    await setDoc(doc(db, 'users', email), { token }, { merge: true });
  } catch (error) {
    console.error(error);
  }
};
