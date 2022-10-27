import React, {createContext, PropsWithChildren, useCallback, useReducer} from 'react';
import {Activity} from '@abstraction/index';
import {createActivity} from '@requests/index';
import {storage} from '@config/index';
import {ref, uploadBytes} from '@firebase/storage';
import {v4} from 'uuid';

type ContextType = {
    activity: Activity;
    setActivity: (activity: Partial<Activity>) => void;
    onSuccess: (imageFiles?: File[]) => Promise<void>;
}

export const ActivityCreationContext = createContext<ContextType>(null);

export const ActivityCreationProvider: React.FC<PropsWithChildren> = (props) => {
    const {children} = props;
    const [activity, setActivity] = useReducer((state, newState) => ({...state, ...newState}), null);

    const onSuccess = useCallback(async (imageFiles?: File[]) => {
        try {
            const imagesPaths: string[] = [];

            for (let image of imageFiles) {
                const imageRef = ref(storage, `images/${v4()}---${image.name}`);
                const snapshot = await uploadBytes(imageRef, image);
                imagesPaths.push(snapshot.ref.fullPath);
            }

            console.log(imagesPaths);
            await createActivity({...activity, imagesPaths});
        } catch (error) {
            console.error(error);
        }
    }, [activity]);

    return (
        <ActivityCreationContext.Provider value={{
            activity,
            setActivity,
            onSuccess,
        }}>
            {children}
        </ActivityCreationContext.Provider>
    );
};
